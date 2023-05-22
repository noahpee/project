import '../../css/Grid.css'
import Tile from './Tile'

export default function Grid({ array, dataBase, setGrid }) {

    return (
            <div className='grid'>
                {array && array.map((id) => {
                return (
                    <Tile key={id} id={dataBase[id]} setGrid={setGrid}/>
                    );
                })}
            </div>        
    )
}
