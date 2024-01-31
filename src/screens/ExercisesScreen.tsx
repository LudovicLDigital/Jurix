import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {Exercise, getExercices} from '../utils/api/getExercices.ts';
import {getStorageAssets} from '../utils/api/getStorageAssets.ts';
import BackgroundContainer from '../component/backgroundContainer.tsx';

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
          `/exercises/${exercises.leftColumn.id}/${exercises.leftColumn.execution[0].image}`,
        );
        setImageUriLeft(uri);
      } catch (error) {
        console.error('Error fetching image left', error);
        // Gérer l'erreur comme vous le souhaitez
      } finally {
        try {
          if (exercises.rightColumn) {
            const uri = await getStorageAssets(
              `/exercises/${exercises.rightColumn.id}/${exercises.rightColumn.execution[0].image}`,
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
  useEffect(() => {
    async function fetchData() {
      const ex = await getExercices();
      const twoColumnExercices: TwoColumnExercises[] = [];
      ex.forEach((exercice, index) => {
        if (index % 2 === 0) {
          twoColumnExercices.push({
            leftColumn: exercice,
            rightColumn: ex[index + 1] || undefined,
          });
        }
      });
      setExercices(twoColumnExercices);
    }

    fetchData();
  }, []);

  return (
    <BackgroundContainer>
      <View style={styles.container}>
        {exercises && exercises.length > 0 && (
          <FlatList
            data={exercises}
            renderItem={({item}) => <ExerciseItem exercises={item} />}
            keyExtractor={item => item.leftColumn.id.toString()}
          />
        )}
      </View>
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
