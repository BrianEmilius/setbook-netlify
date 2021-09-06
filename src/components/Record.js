import { TextField } from "@material-ui/core"

export default function Record({inputField, index, inputFields, setInputFields}) {
  function updateInput(e, index) {
    var values = [...inputFields]
    values[index][e.target.name] = e.target.value
    setInputFields(values)
  }

  return (
    <div style={{display:"flex", flexDirection:"column", margin:"0 .6em"}}>
      <TextField
        name="reps"
        label="reps"
        type="number"
        value={inputField.reps}
        style={{width:"4em"}}
        onChange={e => updateInput(e, index)}
        InputProps={{
          inputProps: {
            min: -100,
            max: 700,
            step: 0.1
          }
        }}
        required
      />
      <TextField
        name="weight"
        label="weight"
        type="number"
        value={inputField.weight}
        style={{width:"4em"}}
        onChange={e => updateInput(e, index)}
        InputProps={{
          inputProps: {
            min: -100,
            max: 700,
            step: 0.1
          }
        }}
        required
      />
    </div>
  )
}
