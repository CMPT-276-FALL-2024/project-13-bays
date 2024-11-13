import '../styles/components/Settings.scss'
import ThemeContext from '../context/theme.context';

function Settings(){
    const { dark, setDark } = useContext(ThemeContext);
    return (
        <div className="Settings">
            <div className="theme-toggler">
                <div className="theme-buttons" onClick={() => setDark(!dark)}>
                    <div className={`light-theme-btn ${dark? '':'active'}`}>
                        <i className="bi bi-sun"></i>
                    </div>
                    <div className={`dark-theme-btn ${dark? 'active':''}`}>
                    <i className="bi bi-moon"></i>
                    </div>
                </div>
            </div>
            <div className="settings-btn">
                <i className="bi bi-gear"></i>
            </div>
        </div>
    );
}

export default Settings;