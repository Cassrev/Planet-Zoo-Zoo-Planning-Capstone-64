import {useState} from 'react';
import { Login } from '../../auth/Login';

export const PlanningToggle = () => {
  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  return (
    <div>
      <button className="StartPlanningButton" onClick={handleClick}>Start Planning</button>

      {/* 👇️ show elements on click */}
      {isShown && (
        <div>
          <h2>Some content here</h2>
        </div>
      )}

      {/* 👇️ show component on click */}
      {isShown && <Login />}
    </div>
  );
}
