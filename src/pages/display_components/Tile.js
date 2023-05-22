import '../../css/Tile.css'

export default function Tile({id, setGrid}) {

  return (
    <div className="tile" onClick={() => setGrid(id)}>
      {id.image && <img className='tile-image' src={id.image} alt={id.text}></img>}
      <p>{id.text}{id.id}</p>
    </div>
    )
}
