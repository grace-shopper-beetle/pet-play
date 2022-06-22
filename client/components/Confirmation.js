import React, {Component} from 'react'

//*"Place Your Order" from Checkout leads to this page

class Confirmation extends Component {
    
    render() {
        return (
            <div className='container'  style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '50vh',
              }}>
            <title>Order Confirmation #01234</title>
                <h2>Thank you for your order!</h2>
                <body>
                    <p>Your order will arrive in 5-7 business days. Please check your e-Meow for the tracking number. Have a Wooferful day!</p>
                </body>
            </div>
        )
    }
}

export default Confirmation;

