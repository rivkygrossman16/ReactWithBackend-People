import React from 'react';
import PersonRow from './PersonRow';
import axios from 'axios';
import AddPersonForm from './AddPersonForm';
import { v4 as uuidv4 } from 'uuid';

class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: '',
        },
        isAdding: false,
        shouldBeDeleted: [],
        isLoading: true,
        isEditing: false,

    }

    componentDidMount() {
        axios.get('/api/people/getall').then(res => {
            this.setState({ people: res.data, isLoading: false });
        });
    }
    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }


    onAddClick = () => {
        this.setState({ isAdding: true });
        axios.post('/api/people/addperson', this.state.person).then(() => {
            this.setState({ isLoading: true });
            axios.get('/api/people/getall').then(res => {
                this.setState({
                    people: res.data,
                    person: {
                        firstName: '',
                        lastName: '',
                        age: '',
                    },
                    isAdding: false,
                    isLoading: false,
                    isEditing: false,
                   
                });
            });
        });
    }


    onDeleteClick = (p) => {
        this.setState({ isAdding: true });
        axios.post('/api/people/deleteperson', p).then(() => {
            console.log(p);
            this.setState({ isLoading: true });
            axios.get('/api/people/getall').then(res => {
                this.setState({
                    people: res.data,
                    person: {
                        firstName: '',
                        lastName: '',
                        age: '',
                    },
                    isAdding: false,
                    isLoading: false,
                    isEditing: false,
                });
            });
        });
    }


    onUpdateClick  = (p) => {
        this.setState({ isAdding: true });
        axios.post('/api/people/editperson', p).then(() => {
            this.setState({ isLoading: true });
            axios.get('/api/people/getall').then(res => {
                this.setState({
                    people: res.data,
                    person: {
                        firstName: '',
                        lastName: '',
                        age: '',
                    },
                    isAdding: false,
                    isLoading: false,
                    isEditing: false,
                });
            });
        });
    }


    onEditClick = (p) => {
        this.setState({ person: p });
        this.setState({ isEditing: true })
    }

    onCancelClick = () => {
        this.setState({
            person: {
                firstName: '',
                lastName: '',
                age: '',
            }})
        this.setState({ isEditing: false })
    }

    generateBody = () => {
        const { isLoading, people } = this.state;
        if (isLoading) {
            return <h1>Loading....</h1>
        }

        return people.map(p => < PersonRow onDeleteClick = {() => this.onDeleteClick(p) }
            onEditClick={() => this.onEditClick(p)}
            shouldBeDeleted={() => this.shouldBeDeleted(p)}
            checked={this.state.shouldBeDeleted.includes(p)}
            person={p}
        />);
    }

   

    shouldBeDeleted = (p) => {
        const { shouldBeDeleted, personShouldBeDeleted } = this.state;
        if (shouldBeDeleted.includes(p)) {
            this.setState({ shouldBeDeleted: shouldBeDeleted.filter(l => l.id !== p.id) });
 }
        else {
            this.setState({ shouldBeDeleted: [...shouldBeDeleted, p] });
        }
    }

    deleteMany = () => {
        this.setState({ isAdding: true });
        const { shouldBeDeleted } = this.state;
        if (shouldBeDeleted!==[]) {
            shouldBeDeleted.forEach(p => this.deleteOnce(p));
        }
        
    }

    checkAll = () => {
        const { shouldBeDeleted, people } = this.state;
        const copy = [];
        people.forEach(p => copy.push(p));
        this.setState({ shouldBeDeleted: copy });
    }

    deleteOnce=(p)=>{
    axios.post('/api/people/deleteperson', p).then(() => {
        this.setState({ isLoading: true });
        axios.get('/api/people/getall').then(res => {
            this.setState({
                people: res.data,
                person: {
                    firstName: '',
                    lastName: '',
                    age: '',
                },
                isAdding: false,
                isLoading: false,
                isEditing: false,
            });
        });
    });
    }
   
    unCheckAll = () => {
        const { shouldBeDeleted } = this.state;
        this.setState({ shouldBeDeleted: [] });
      
    }
            
    render() {
        const { person, isAdding, isEditing } = this.state;
        const { firstName, lastName, age } = person;
        return (
            <div className='container mt-5'>
                <AddPersonForm
                    firstName={firstName}
                    lastName={lastName}
                    age={age}
                    onTextChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    isAdding={isAdding}
                    isEditing={isEditing}
                    onUpdateClick={() => this.onUpdateClick(person)}
                    onCancelClick={() => this.onCancelClick()}
                />
                <table className='table table-hover table-striped table-bordered mt-3'>
                    <thead>
                        <tr>
                            <button onClick={this.deleteMany} className="btn btn-danger btn-block">Delete All</button>
                            <button onClick={this.checkAll} className="btn btn-info btn-block">Check All</button>
                            <button onClick={this.unCheckAll} className="btn btn-info btn-block">Uncheck All</button>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Age</td>
                            <td>Edit/Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateBody()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PeopleTable;
