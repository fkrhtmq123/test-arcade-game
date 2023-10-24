import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Fly.css';
import FlyContainer from '../components/FlyContainer';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Fly</IonTitle>
          </IonToolbar>
        </IonHeader>
        <FlyContainer />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;