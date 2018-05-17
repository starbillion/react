import React from 'react';
import {
    Row
} from 'reactstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const AU = [
    { value: 'australian-capital-territory', label: 'Australian Capital Territory', className: 'State-ACT' },
    { value: 'new-south-wales', label: 'New South Wales', className: 'State-NSW' },
    { value: 'victoria', label: 'Victoria', className: 'State-Vic' },
    { value: 'queensland', label: 'Queensland', className: 'State-Qld' },
    { value: 'western-australia', label: 'Western Australia', className: 'State-WA' },
    { value: 'south-australia', label: 'South Australia', className: 'State-SA' },
    { value: 'tasmania', label: 'Tasmania', className: 'State-Tas' },
    { value: 'northern-territory', label: 'Northern Territory', className: 'State-NT' }
];

class OwnerSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: AU,
            disabled: false,
            clearable: false,
            selectValue: 'new-south-wales',
            owners: this.getOwners()
        }

        console.log(this.props.owner);
    }
    updateValue = (newValue) => {
        this.setState({
            selectValue: newValue
        });
    }

    toggleCheckbox = (e) => {
        let newState = {};
        newState[e.target.name] = e.target.checked;
        this.setState(newState);
    }

    getOwners = () => {
        let owners = [];
        if (this.props.owner) {
            this.props.owner.forEach(function (owner) {
                let tempObj = {};
                tempObj.label = owner.first_name + " " + owner.last_name;
                tempObj.value = owner.id;
                owners.push(tempObj);
            });
        }

        return owners;
    }

    render() {
        let { options, disabled, clearable, selectValue } = this.state;
        return (
            <Row className="mb-4" style={{ flex: '1' }}>
                <div className="col-3 mt-2">
                    Owner
                </div>
                <div className="col-9">
                    <Select options={this.state.owners} autfocus clearable={clearable} disabled={disabled}
                        value={selectValue} onChange={this.updateValue} />
                </div>
            </Row>
        )

    }
}




export default OwnerSelect;
