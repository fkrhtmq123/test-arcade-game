import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SugerContainer from '../components/SugerContainer';

const Suger: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <SugerContainer />
      </IonContent>
    </IonPage>
  );
};

export default Suger;
