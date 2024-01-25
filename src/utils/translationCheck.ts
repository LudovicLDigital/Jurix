interface TranslationError {
  path: string; // the JSON path at which the error occurred
  valueType: string; // the type of the value where the error occurred
  errorType: 'missing' | 'mismatch'; // 'missing' for a value that should be there, 'mismatch' when the value is a scalar or a namespace depending on the language
  scalarIn: number[]; // other languages in which this value is a scalar
  namespaceIn: number[]; // other languages in which this value is a namespace
}

const recurseCheckParity = (
  languages: {code: string; resources?: {[s: string]: string | object}}[],
): TranslationError[][] => {
  const errors: TranslationError[][] = languages.map(() => []);

  const keysToCheck = new Set<string>();

  languages.forEach(language =>
    Object.getOwnPropertyNames(language.resources || {}).forEach(key =>
      keysToCheck.add(key),
    ),
  );

  keysToCheck.forEach(key => {
    const valueTypes = languages.map(language => {
      if (!language.resources) {
        return;
      }

      return typeof language.resources[key];
    });

    const scalars = valueTypes
      .map((_, i) => i)
      .filter(i => valueTypes[i] === 'string');
    const namespaces = valueTypes
      .map((_, i) => i)
      .filter(i => valueTypes[i] === 'object');
    const missings = valueTypes
      .map((_, i) => i)
      .filter(i => valueTypes[i] !== 'string' && valueTypes[i] !== 'object');

    if (scalars.length === 0 && missings.length === 0) {
      const nestedLanguages = languages.map(l => ({
        ...l,
        resources: l.resources?.[key] as {},
      }));
      const nestedErrors = recurseCheckParity(nestedLanguages);

      nestedErrors.forEach((languageErrors, i) => {
        errors[i].push(
          ...languageErrors.map(error => ({
            ...error,
            path: `${key}.${error.path}`,
          })),
        );
      });
    }

    if (
      scalars.length === languages.length ||
      namespaces.length === languages.length
    ) {
      return;
    }

    languages.forEach((language, i) => {
      const languageErrors = errors[i];
      const valueType = valueTypes[i];

      if (valueType === 'string' && namespaces.length !== 0) {
        languageErrors.push({
          path: key,
          valueType,
          errorType: 'mismatch',
          scalarIn: scalars,
          namespaceIn: namespaces,
        });
        return;
      }

      if (valueType === 'object' && scalars.length !== 0) {
        languageErrors.push({
          path: key,
          valueType,
          errorType: 'mismatch',
          scalarIn: scalars,
          namespaceIn: namespaces,
        });
        return;
      }

      if (
        valueType !== 'string' &&
        valueType !== 'object' &&
        (scalars.length + missings.length === languages.length ||
          namespaces.length + missings.length === languages.length)
      ) {
        languageErrors.push({
          path: key,
          valueType: 'undefined',
          errorType: 'missing',
          scalarIn: scalars,
          namespaceIn: namespaces,
        });
      }
    });
  });

  return errors;
};

export const translationCheck = (resources: {[languageCode: string]: any}) => {
  const languages = Object.getOwnPropertyNames(resources);
  const errors = recurseCheckParity(
    languages.map(languageCode => ({
      code: languageCode,
      resources: resources[languageCode],
    })),
  );
  const errorCount = errors.reduce((acc, val) => acc + val.length, 0);

  if (errorCount === 0) {
    console.info(`No errors detected in the translation files (${languages})`);
    return;
  }

  errors.forEach((languageErrors, i) => {
    if (languageErrors.length === 0) {
      console.log(`No error for language '${languages[i]}'`);
      return;
    }

    console.warn(`Errors found for language '${languages[i]}':`);
    languageErrors.forEach(error => {
      let errorText = 'Unknown error';

      if (error.errorType === 'mismatch') {
        errorText = 'Mismatched value type';

        if (error.valueType === 'string') {
          errorText += ` (is a namespace in ${error.namespaceIn.map(
            lI => languages[lI],
          )})`;
        }

        if (error.valueType === 'object') {
          errorText += ` (is a string in ${error.scalarIn.map(
            lI => languages[lI],
          )})`;
        }
      }

      if (error.errorType === 'missing') {
        errorText = `Missing ${
          error.scalarIn.length > 0 ? 'value' : 'namespace'
        } (exists in ${[...error.scalarIn, ...error.namespaceIn].map(
          lI => languages[lI],
        )})`;
      }

      console.warn(`    [${error.path}] ${errorText}`);
    });
  });
};
