import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Fruit.css';
import FruitContainer from '../components/FruitContainer';

const Fruit: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <FruitContainer />
      </IonContent>
    </IonPage>
  );
};

export default Fruit;
