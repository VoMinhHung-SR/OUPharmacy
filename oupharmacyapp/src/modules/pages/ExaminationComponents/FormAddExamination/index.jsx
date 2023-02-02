import useExamination from "../hooks/useExamination"

const FormAddExamination = (props) => {
    if (props.checkPatientExist)
        return (
            <h3>Patient Exist</h3>
        )
    return (
        <h3>Patient doesnt Exist</h3>
    )
}
export default FormAddExamination