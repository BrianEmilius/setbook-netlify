import "./Record.scss"

export default function Record({inputField, index, inputFields, setInputFields}) {
  function updateInput(e, index) {
    var values = [...inputFields]
    values[index][e.target.name] = e.target.value
    setInputFields(values)
  }

  return (
    <div style={{display:"flex", flexDirection:"column", margin:"0 .6em"}}>
      <label className="label">
        reps
        <input
          name="reps"
          type="number"
          value={inputField.reps}
          className="inputField"
          onChange={e => updateInput(e, index)}
          min="-200"
          max="1000"
          step="0.1"
          required
        />
      </label>
      <label className="label">
        weight
        <input
          name="weight"
          type="number"
          value={inputField.weight}
          className="inputField"
          onChange={e => updateInput(e, index)}
          min="-200"
          max="1000"
          step="0.1"
          required
        />
      </label>
    </div>
  )
}
