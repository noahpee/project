import Delete from './buttons/Delete'
import Clear from './buttons/Clear'
import Tile from './Tile'
import '../../css/Sentence.css'

export default function Sentence({sentence, dataBase, deleteLastWord, clearSentence}) {

  return (
    <div className='sentence'>
        <Delete deleteLastWord={deleteLastWord}/>
        <div className='sentence-wrapper'>
                {sentence && sentence.forEach((id) => {
                return (
                    <Tile key={id} id={dataBase[id]} />
                    );
                })}
            </div>           
        <Clear clearSentence={clearSentence} />
    </div>
  )
}
