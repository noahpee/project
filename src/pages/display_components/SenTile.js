import '../../css/Sentence.css'

export default function SenTile({id}) {

    return (
    <div className="sentence-tile" >
        {id.image && <img className='sentence-tile-image' src={id.image} alt={id.text}></img>}
        <p>{id.text}{id.id}</p>
    </div>
    )
}