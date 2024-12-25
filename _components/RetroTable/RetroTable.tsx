import styles from './RetroTable.module.scss';

export default function RetroTable() {
    return (
        <div className="retrotable--container">
            <div className="retrotable--content">
                <div className="retrotable--term--name--container">
                    <input className="retro--input" type="text"></input>
                </div>
                <div className="retrotable--table--container">
                    <Table/>
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
                    <th>course</th>
                    <th>course code</th>
                    <th>grade</th>
                    <th>unit</th>
                </tr>
            </tbody>
        </table>
    );
}