import React from "react";
import "./styles.css";
import "./subs.json";

/* testing out functional components to render form errors */

const FormErrors = ({formErrors}) =>
    <div>
        {Object.keys(formErrors).map((errorField, i) => (
                    <p>{formErrors[errorField]}</p>
                    ))}
    </div>

export default FormErrors