import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Fruit.css';
import FruitContainer from '../components/FruitContainer';

const Fruit: React.FC = () => {
  return (
    <IonContent>
      <FruitContainer />
    </IonContent>
  );
};

export default Fruit;
