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
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Fruit';
import Tab2 from './pages/Fly';
import Tab3 from './pages/Hunting';

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

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/fruit">
            <Tab1 />
          </Route>
          <Route exact path="/fly">
            <Tab2 />
          </Route>
          <Route path="/hunting">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/fruit" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="fruit" href="/fruit">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Fruit</IonLabel>
          </IonTabButton>
          <IonTabButton tab="fly" href="/fly">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Fly</IonLabel>
          </IonTabButton>
          <IonTabButton tab="hunting" href="/hunting">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Hunting</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
