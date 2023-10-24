import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Fruit.css';
import FruitContainer from '../components/FruitContainer';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Fruit</IonTitle>
          </IonToolbar>
        </IonHeader>
        <FruitContainer />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
