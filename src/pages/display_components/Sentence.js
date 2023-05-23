import Delete from './buttons/Delete'
import Clear from './buttons/Clear'
import SenTile from './SenTile'
import '../../css/Sentence.css'

export default function Sentence({sentence, userSentence, dataBase, deleteLastWord, clearSentence}) {
  
  function speakEasy() {
    var msg = new SpeechSynthesisUtterance();
    msg.text = sentence.join(" ")
    window.speechSynthesis.speak(msg);
  }

  return (
    <div className='sentence'>
        <Delete deleteLastWord={deleteLastWord}/>
        <div className='sentence-wrapper' onClick={speakEasy}>
                {sentence && sentence.map((id, index) => {
                return (
                    <SenTile key={id} id={dataBase[userSentence[index]]} />
                    );
                })}
            </div>           
        <Clear clearSentence={clearSentence} />
    </div>
  )
}
