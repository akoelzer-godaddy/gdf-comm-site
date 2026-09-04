import ChevronRight from '@ux/icon/chevron-right';

import '@ux/icon/chevron-right/styles';
import '../styles/slat.css';


function Slat({ icon, title }) {
  return (
    <div className="slat">
      <div className="slat-content">
        { icon }
        <div className="slat-title">{ title }</div>
      </div>
      <ChevronRight height={24} width={24} />
    </div>
  );
}

export default Slat;