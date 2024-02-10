import React from 'react';

function initContext<ContextValueType extends object>(
  rootComponentName: string,
) {
  const Context = React.createContext<ContextValueType | null>(null);

  function Provider({
    children,
    ...providerProps
  }: ContextValueType & {
    children: React.ReactNode;
  }): JSX.Element {
    const value = React.useMemo(
      () => providerProps,
      [providerProps],
    ) as ContextValueType;

    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function useContext(consumerName: string) {
    const context = React.useContext(Context);
    if (context === null) {
      throw new Error(
        `\`${consumerName}\` must be used within \`${rootComponentName}\`.`,
      );
    }
    return context;
  }

  Provider.displayName = `${rootComponentName}Provider`;

  return [Provider, useContext] as const;
}

export {initContext};
