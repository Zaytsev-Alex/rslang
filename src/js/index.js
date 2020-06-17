import "../css/style.css";
import "../css/style.scss";
import {createControlElements, createMainContent} from './MainContent/mainContent'



document.body.append(createMainContent());
createControlElements();