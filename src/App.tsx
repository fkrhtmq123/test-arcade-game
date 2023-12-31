import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactHashRouter, IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Fly from './pages/Fly';
import Fruit from './pages/Fruit';
import Hunting from './pages/Hunting';
import Home from './pages/Home';
import Suger from './pages/Suger';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <IonRouterOutlet>
          <IonReactHashRouter>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/fruit">
              <Fruit />
            </Route>
            <Route exact path="/fly">
              <Fly />
            </Route>
            <Route exact path="/hunting">
              <Hunting />
            </Route>
            <Route exact path="/suger">
              <Suger />
            </Route>
            {/* <Route exact path="/">
              <Redirect to="/arcade/" />
            </Route> */}
          </IonReactHashRouter>
        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
