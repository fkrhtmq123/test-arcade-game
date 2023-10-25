import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Fly.css';
import FlyContainer from '../components/FlyContainer';

const Fly: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <FlyContainer />
      </IonContent>
    </IonPage>
  );
};

export default Fly;
