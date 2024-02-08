import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Exercise} from '../utils/api/getExercices.ts';
import {getStorageAssets} from '../utils/api/getStorageAssets.ts';
import BackgroundContainer from '../component/backgroundContainer.tsx';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {COLORS} from '../utils/constants.ts';
import SearchBar from '../component/SearchBar.tsx';

const EXERCISES_COLLECTION = 'exercises';

type TwoColumnExercises = {
  leftColumn: Exercise;
  rightColumn?: Exercise;
};

const ExerciseItem = ({exercises}: {exercises: TwoColumnExercises}) => {
  const [imageUriLeft, setImageUriLeft] = useState<string>();
  const [imageUriRight, setImageUriRight] = useState<string>();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const uri = await getStorageAssets(
          `/${EXERCISES_COLLECTION}/${exercises.leftColumn.id}/${exercises.leftColumn.image}`,
        );
        setImageUriLeft(uri);
      } catch (error) {
        console.error('Error fetching image left', error);
        // Gérer l'erreur comme vous le souhaitez
      } finally {
        try {
          if (exercises.rightColumn) {
            const uri = await getStorageAssets(
              `/${EXERCISES_COLLECTION}/${exercises.rightColumn.id}/${exercises.rightColumn.image}`,
            );
            setImageUriRight(uri);
          }
        } catch (error) {
          console.error('Error fetching image right', error);
        }
      }
    };

    fetchImage();
  }, [exercises]);

  const renderExercice = useCallback((exercise: Exercise, image?: string) => {
    return (
      <View style={styles.cardContainer}>
        {image && <Image source={{uri: image}} style={styles.imageStyle} />}
        <Text style={styles.textStyle}>{exercise.title}</Text>
      </View>
    );
  }, []);

  return (
    <View style={styles.rowContainer}>
      {renderExercice(exercises.leftColumn, imageUriLeft)}
      {exercises.rightColumn &&
        renderExercice(exercises.rightColumn, imageUriRight)}
    </View>
  );
};

const ExercisesScreen = () => {
  const [exercises, setExercices] = useState<TwoColumnExercises[]>([]);
  const [initialExercises, setInitialExercises] = useState<
    TwoColumnExercises[]
  >([]);
  const [loading, setLoading] = useState(true); // Set loading to true on component mount

  const feedExercises = useCallback(
    (
      querySnapshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
      isInitial?: boolean,
    ) => {
      const _exercises: Exercise[] = [];
      querySnapshot.forEach(documentSnapshot => {
        _exercises.push({
          id: documentSnapshot.data().id,
          description: documentSnapshot.data().description,
          execution: documentSnapshot.data().execution,
          title: documentSnapshot.data().title,
          videoUrl: documentSnapshot.data().videoUrl,
          titleIdentifier: documentSnapshot.data().titleIdentifier,
          image: documentSnapshot.data().image,
        });
      });

      const twoColumnExercices: TwoColumnExercises[] = [];
      _exercises.forEach((exercice, index) => {
        if (index % 2 === 0) {
          twoColumnExercices.push({
            leftColumn: exercice,
            rightColumn: _exercises[index + 1] || undefined,
          });
        }
      });
      setExercices(twoColumnExercices);
      if (isInitial) {
        setInitialExercises(twoColumnExercices);
      }
    },
    [],
  );

  useEffect(() => {
    const subscriber = firestore()
      .collection(EXERCISES_COLLECTION)
      .onSnapshot(querySnapshot => {
        feedExercises(querySnapshot, true);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [feedExercises]);

  const runOnSearchQuery = useCallback(
    (query: string) => {
      if (query === '') {
        return;
      } else if (query.length < 3) {
        return;
      } else {
        firestore()
          .collection(EXERCISES_COLLECTION)
          .where('titleIdentifier', '>=', query.toLowerCase())
          .where('titleIdentifier', '<=', query.toLowerCase() + '\uf8ff')
          .get()
          .then(querySnapshot => feedExercises(querySnapshot));
      }
    },
    [feedExercises],
  );

  return (
    <BackgroundContainer>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      ) : (
        <View style={styles.container}>
          <SearchBar
            onSearch={query => runOnSearchQuery(query)}
            onClear={() => setExercices(initialExercises)}
          />
          {exercises && exercises.length > 0 && (
            <FlatList
              data={exercises}
              renderItem={({item}) => <ExerciseItem exercises={item} />}
              keyExtractor={item => item.leftColumn.id.toString()}
            />
          )}
        </View>
      )}
    </BackgroundContainer>
  );
};

export default ExercisesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    width: '45%',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#FFF', // Ajustez la couleur de fond si nécessaire
  },
  imageStyle: {
    width: '100%', // Ajustez la largeur si nécessaire
    aspectRatio: 1, // Ajustez le ratio aspect si nécessaire
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    fontSize: 18, // Ajustez la taille de police si nécessaire
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
