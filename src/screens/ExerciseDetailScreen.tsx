import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import BackgroundContainer from '../component/backgroundContainer.tsx';
import Icons from '../assets/icons';
import YoutubeVideo from '../component/YoutubeVideo.tsx';
import {getStorageAssets} from '../utils/api/getStorageAssets.ts';
import {Execution, Exercise} from '../utils/api/getExercices.ts';
import {useTranslation} from 'react-i18next';

const ExecutionStep = ({
  index,
  exercise,
  execution,
}: {
  index: number;
  exercise: Exercise;
  execution: Execution;
}) => {
  const {t} = useTranslation('exerciseDetails');
  const [imageUri, setImageUri] = useState<string>();

  useEffect(() => {
    const loadImage = async () => {
      const uri = await getStorageAssets(
        `/exercises/${exercise.id}/${execution.image}`,
      );
      setImageUri(uri);
    };

    if (exercise.image) {
      loadImage();
    }
  }, [exercise, execution]);

  return (
    <View style={styles.executionStep}>
      {imageUri && <Image source={{uri: imageUri}} style={styles.imageStyle} />}
      <Text style={styles.executionStepNumber}>
        {t('step', {index: index + 1})}
      </Text>
      <Text>{execution.description}</Text>
    </View>
  );
};

const ExerciseDetailScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const {t} = useTranslation('exerciseDetails');
  const {exercise}: {exercise: Exercise} = route.params;

  const renderExecutionStepper = useCallback(() => {
    return (
      <FlatList
        horizontal={true}
        data={exercise.execution}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <ExecutionStep index={index} execution={item} exercise={exercise} />
          );
        }}
      />
    );
  }, [exercise]);

  return (
    <BackgroundContainer>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.pop()}>
          <Image source={Icons.arrowBack} style={{width: 20, height: 20}} />
          <Text style={styles.backText}>{t('back')}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{exercise.title}</Text>
        <Text style={styles.subTitle}>{t('description')}</Text>
        <Text>{exercise.description}</Text>
        {exercise.execution && renderExecutionStepper()}
        <Text style={styles.subTitle}>{t('video')}</Text>
        <YoutubeVideo videoUrl={exercise.videoUrl} />
      </ScrollView>
    </BackgroundContainer>
  );
};

export default ExerciseDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  backButton: {
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    margin: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'black',
  },
  backText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    width: '100%',
    textAlign: 'center',
    marginTop: '20%',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 20,
    width: '100%',
  },
  imageStyle: {
    width: '100%',
    aspectRatio: 1,
    padding: 5,
  },
  executionStep: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    margin: 10,
    padding: 5,
    borderRadius: 10,
    borderColor: 'lightgrey',
  },
  executionStepNumber: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    fontSize: 12,
  },
});
