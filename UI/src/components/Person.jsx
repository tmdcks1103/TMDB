import styled from "styled-components";

const Person = ({ person }) => {
    return (
        <PersonContainer>
            <img src={`https://image.tmdb.org/t/p/original/${person.profile_path}`} />
            <div>
                <div style={{ marginTop: "10px" }}>{person.name}</div>
                {person.character ?
                    <div style={{ marginBottom: "20px" }}>{person.character}</div>
                    : <div style={{ marginBottom: "20px" }}>({person.job})</div>
                }
            </div>
        </PersonContainer>
    )
}

export default Person;

const PersonContainer = styled.div`
    display:flex;
    flex-direction:column;
    img{
        width:100px;
        height:100px;
        border-radius:50%;
        object-fit:cover;
        border:1px solid white;
    }
`