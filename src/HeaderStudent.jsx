import parheekshaLogo from './assets/Parheeksha.png';
import './App.css';
function HeaderStudent(){
    return(
      <div>
        <header id="header">
        <nav>
              <a href = ""><img className="parheeksha-logo" src={parheekshaLogo} alt="logo"/></a>
              <ul>
                  <li><a href="">Home</a></li>
                  <li><a href="">Teachers</a></li>
                  <li><a href="">Students</a></li>
              </ul>
          </nav></header>
       </div>
    );
}
export default HeaderStudent;
