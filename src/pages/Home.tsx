import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import HomeContainer from '../components/HomeContainer';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <HomeContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
