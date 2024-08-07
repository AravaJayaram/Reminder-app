
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './SaveDetails.css';

// const SaveDetails = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         dob: '',
//         sex: 'Male',
//     });

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleSave = async(e) => {
//         e.preventDefault();
//         try {
//             console.log(formData);
            
//             const response=await axios.post('http://127.0.0.1:8000/userapi/user/', formData);
//             console.log(response.data);
         
//             navigate('/');
//           } catch (error) {
//             console.error('Error submitting form:', error.response?.data || error.message);
//           }
     
//         console.log('Form data saved:', formData);
//         navigate('/');
//     };

//     const handleCancel = () => {
//         navigate('/');
//     };

//     return (
//         <div className="form-container">
//             <form>
//                 <div>
//                     <label>Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                     <label>Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                     <label>Date of Birth</label>
//                     <input
//                         type="date"
//                         name="dob"
//                         value={formData.dob}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                     <label>Sex</label>
//                     <select
//                         name="sex"
//                         value={formData.sex}
//                         onChange={handleChange}
//                     >
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                     </select>
//                 </div>
//                 <div>
//                     <button type="button" onClick={handleSave}>
//                         Save
//                     </button>
//                     <button type="button" onClick={handleCancel}>
//                         Cancel
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default SaveDetails;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SaveDetails.css';

const SaveDetails = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dob: '',
        sex: 'Male',
    });

    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (name === 'email') {
            setEmailError('');
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!validateEmail(formData.email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        try {
            console.log(formData);

            const response = await axios.post('http://127.0.0.1:8000/userapi/user/', formData);
            console.log(response.data);

            navigate('/');
        } catch (error) {
            console.error('Error submitting form:', error.response?.data || error.message);
        }

        console.log('Form data saved:', formData);
        navigate('/');
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="form-container">
            <form>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {emailError && <span className="error">{emailError}</span>}
                </div>
                <div>
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Sex</label>
                    <select
                        name="sex"
                        value={formData.sex}
                        onChange={handleChange}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <button type="button" onClick={handleSave}>
                        Save
                    </button>
                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SaveDetails;
