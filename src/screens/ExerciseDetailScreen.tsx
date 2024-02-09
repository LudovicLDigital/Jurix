import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import BackgroundContainer from '../component/backgroundContainer.tsx';
import Icons from '../assets/icons';
import YoutubeVideo from '../component/YoutubeVideo.tsx';

const ExerciseDetailScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const {exercise} = route.params;
  return (
    <BackgroundContainer>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.pop()}>
          <Image source={Icons.arrowBack} style={{width: 20, height: 20}} />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{exercise.title}</Text>
        <Text style={styles.subTitle}>Description</Text>
        <Text>{exercise.description}</Text>
        <Text style={styles.subTitle}>Exécution en vidéo</Text>
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
});
