import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Hunting.css';
import HuntingContainer from '../components/HuntingContainer';

const Hunting: React.FC = () => {
  return (
    <IonContent>
      <HuntingContainer />
    </IonContent>
  );
};

export default Hunting;
