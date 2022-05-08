import React from 'react';


function PersonRow({ person, onDeleteClick, onEditClick, shouldBeDeleted, checked }) {
    const { firstName, lastName, age } = person;
    return (
        <tr>
            <td>
                <input checked={checked} onChange={shouldBeDeleted} type="checkbox" className="form-control" />
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <div col-md-12>
                    <button className="btn btn-warning" onClick={onEditClick}>Edit</button>
                    <button className="btn btn-danger" onClick={onDeleteClick}>Delete</button>
                </div>
            </td>
        </tr>
    )
}

export default PersonRow;