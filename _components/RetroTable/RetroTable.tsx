import styles from './RetroTable.module.scss';

export default function RetroTable() {
    return (
        <div className="retrotable--container">
            <div className="retrotable--content">
                <div className="retrotable--term--name--container">
                    <input className="retro--input" type="text"></input>
                </div>
                <div className="retrotable--table--container">
                    
                </div>
                <div className="retrotable--footer--container"></div>
            </div>
        </div>
    );
}


function Table() {
    return (
        <table className={styles.retrotable}>
            <thead>
                <tr>
                    <th>course</th>
                    <th>course code</th>
                    <th>grade</th>
                    <th>unit</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <th>The History of the Philippines</th>
                    <th>GERPHIS</th>
                    <th>3.0</th>
                    <th>3.0</th>
                </tr>

                <tr>
                    <th>The History of the Philippines</th>
                    <th>GERPHIS</th>
                    <th>3.0</th>
                    <th>3.0</th>
                </tr>
            </tbody>
        </table>
    );
}