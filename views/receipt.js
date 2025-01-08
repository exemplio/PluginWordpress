const Receipt = ({ paymentFun,all_data, actual_status, actual_status_icon, parsePhone, parseDate,payments, payment, parsearImagen, parseAmountCalculate, parseAmountIva, parseTelefono, real_data, parseDate2, openModalrechazarPago, aprobarPago, redirect, openCerrar, print }) => {
    const [isB2b, setIsB2b] = React.useState(true);
    return React.createElement("div", { className: "col-lg-12 col-md-12 col-sm-12 col-12" },
        React.createElement('div', { className: 'row pt-3' },
            React.createElement('div', { className: 'col-lg-12 col-md-12 col-sm-12 col-12' },
                React.createElement('h4', { className: 'mb-3' }, 'Datos del cliente titular'),
                    React.createElement('div', { style: { marginTop: '10px', borderRadius: '5px', border: '1px solid #E5E5E5'}, className: 'card'},
                        React.createElement('div', { className: 'card-body' },
                            React.createElement('div', { className: 'row texto-movistar' }, !isB2b 
                                && all_data?.publication_name && React.createElement(
                                    'div',
                                    { className: 'col-lg-6 col-md-6 col-sm-12 col-12' },
                                    React.createElement('label', null, 
                                        React.createElement('b', { className: 'font-light' }, 'Producto: '), 
                                        all_data.publication_name.toUpperCase()
                                    )
                                ),
                                all_data?.sequence != null && React.createElement(
                                    'div',
                                    { className: 'col-lg-6 col-md-6 col-sm-12 col-12 d-flex', style: { justifyContent: 'space-between' } },
                                    React.createElement('label', null,
                                        React.createElement('b', { className: 'font-light' }, 'Nro Orden: '), 
                                        all_data.sequence
                                    )
                                ),
                                all_data?.client_name && React.createElement(
                                    'div',
                                    { className: 'col-lg-6 col-md-6 col-sm-12 col-12' },
                                    React.createElement('label', null, 
                                        React.createElement('b', { className: 'font-light' }, 'Nombre: '), all_data.client_name.toUpperCase()
                                    )
                                ),
                                React.createElement('div',{ className: 'col-lg-6 col-md-6 col-sm-12 col-12 d-flex', style: { justifyContent: 'space-between' } },
                                    React.createElement('label', null,
                                        React.createElement('b', { className: 'font-light' }, 'Estatus: '), 
                                        actual_status,
                                        React.createElement('i', { className: actual_status_icon })
                                    )
                                ),
                                all_data?.sap_number && React.createElement(
                                    'div',
                                    { className: 'col-lg-6 col-md-6 col-sm-12 col-12', style: { justifyContent: 'space-between' } },
                                    React.createElement('label', null, 
                                        React.createElement('b', { className: 'font-light' }, 'Código sap: '), 
                                        all_data.sap_number
                                    )
                                ),
                                all_data?.client_id_doc && React.createElement(
                                    'div',
                                    { className: 'col-lg-6 col-md-6 col-sm-12 col-12' },
                                    React.createElement('label', null, 
                                        React.createElement('b', { className: 'font-light' }, 'Cédula/RIF: '), 
                                        all_data.client_id_doc
                                    )
                                ),
                                all_data?.pay_account && React.createElement(
                                    'div',
                                    { className: 'col-lg-6 col-md-6 col-sm-12 col-12', style: { justifyContent: 'space-between' } },
                                    React.createElement('label', null, 
                                        React.createElement('b', { className: 'font-light' }, 'Cuenta pagadora: '), 
                                        all_data.pay_account
                                    )
                                ),
                                all_data?.client_phone && React.createElement(
                                    'div',
                                    { className: 'col-12' },
                                    React.createElement('label', null, 
                                        React.createElement('b', { className: 'font-light' }, 'Teléfono de contacto: '), 
                                        parsePhone(all_data.client_phone)
                                    )
                                ),
                                all_data?.client_email && React.createElement(
                                    'div',
                                    { className: 'col-12' },
                                    React.createElement('label', null, 
                                        React.createElement('b', { className: 'font-light' }, 'Correo electrónico: '), 
                                        all_data.client_email.toLowerCase()
                                    )
                                ),
                                all_data?.info?.created_at && React.createElement(
                                    'div',
                                    { className: 'col-12' },
                                    React.createElement('label', null, 
                                        React.createElement('b', { className: 'font-light' }, 'Fecha: '), 
                                        parseDate(all_data.info.created_at)
                                    )
                                )
                            )
                        )
                    )
                )
        ),
        React.createElement('div',{ className: 'row pt-3' },
            payments && payments.length !== 0 && React.createElement( 'div', { className: 'col-lg-12 col-md-12 col-sm-12 col-12' },
                React.createElement('h4', { className: 'mb-3' }, 'Detalle del pago'),
                payments.map(item => React.createElement(
                    'div',
                    { className: 'card', style: { marginBottom: '1rem' } },
                    React.createElement(
                        'div',
                        { className: 'card-body', style: { padding: '20px' } },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-lg-6 col-md-6 col-sm-6 col-12 d-flex' },
                                React.createElement(
                                    'div',
                                    { style: { display: 'inline-block', marginRight: '10px', verticalAlign: 'top' } },
                                    item.collector_bank_thumbnail && React.createElement('img', { src: parsearImagen(item.collector_bank_thumbnail), width: '40px' })
                                ),
                                React.createElement(
                                    'div',
                                    { style: { display: 'flex' } },
                                    React.createElement(
                                        'div',
                                        null,
                                        item.collector_bank_name && React.createElement('h5', { className: 'Poppins-light', style: { marginTop: 0, marginBottom: 0 } }, item.collector_bank_name),
                                        item.ccr ? React.createElement(
                                            'p',
                                            null,
                                            item.ccr.card_type && React.createElement('label', { className: 'Poppins-regular', style: { marginTop: 0, marginBottom: 0, color: 'black', fontSize: '12px' } }, `Método: `, React.createElement('b', null, item.ccr.card_type)),
                                            item.ccr.affiliate && React.createElement('label', { className: 'Poppins-regular', style: { marginTop: 0, marginBottom: 0, color: 'black', fontSize: '12px' } }, `Afiliado: `, React.createElement('b', null, item.ccr.affiliate)),
                                            item.ccr.terminal && React.createElement('label', { className: 'Poppins-regular', style: { marginTop: 0, marginBottom: 0, color: 'black', fontSize: '12px' } }, `Terminal: `, React.createElement('b', null, item.ccr.terminal)),
                                            item.ccr.trace && React.createElement('label', { className: 'Poppins-regular', style: { marginTop: 0, marginBottom: 0, color: 'black', fontSize: '12px' } }, `Trace: `, React.createElement('b', null, item.ccr.trace))
                                        ) : React.createElement(
                                            'p',
                                            null,
                                            item.payment_method && React.createElement('label', { className: 'Poppins-regular', style: { marginTop: 0, marginBottom: 0, color: 'black', fontSize: '12px' } }, `Método: `, React.createElement('b', null, translate(item.payment_method))),
                                            item.payer_id_doc && React.createElement('label', { className: 'Poppins-regular', style: { marginTop: 0, marginBottom: 0, color: 'black', fontSize: '12px' } }, `RIF: `, React.createElement('b', null, item.payer_id_doc)),
                                            item.payer_phone && React.createElement('label', { className: 'Poppins-regular', style: { marginTop: 0, marginBottom: 0, color: 'black', fontSize: '12px' } }, `Telefono: `, React.createElement('b', null, parsePhone(item.payer_phone)))
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-lg-6 col-md-6 col-sm-6 col-12', style: { textAlign: 'right' } },
                                item.ccr?.approval && React.createElement('h4', { className: 'Poppins-bold', style: { marginTop: 0, marginBottom: 0, color: '#5bc500' } }, item.ccr.approval),
                                item.payer_reference && React.createElement('h4', { className: 'Poppins-bold', style: { marginTop: 0, marginBottom: 0, color: '#5bc500' } }, item.payer_reference),
                                React.createElement('label', { className: 'Poppins-regular', style: { marginTop: 0, marginBottom: 0, color: '#757575', fontSize: '14px' } },
                                    actual_status_icon && React.createElement('i', { className: actual_status_icon, 'aria-hidden': 'true' }),
                                    actual_status
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { style: { marginTop: '15px' }, className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-lg-12 col-md-12 col-sm-12 col-12', style: { textAlign: 'center' } },
                                all_data?.total_converted?.VED?.amount && React.createElement('h2', { className: 'Poppins-light', style: { color: 'black', marginBottom: 0 } },
                                    React.createElement('label', { className: 'Poppins-bold', style: { fontSize: '14px', marginBottom: 0 } }, 'Bs.'),
                                    ` ${parseAmount(item.amount)}`
                                )
                            ),
                            all_data?.publication_name && React.createElement(
                                'div',
                                { className: 'col-lg-12 col-md-12 col-sm-12 col-12', style: { textAlign: 'center', color: '#9e9e9e' } },
                                React.createElement('h6', { className: 'Poppins-light', style: { color: 'black', marginTop: 0 } }, all_data.publication_name)
                            )
                        ),
                        React.createElement(
                            'div',
                            { style: { marginTop: '15px' }, className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-lg-6 col-md-6 col-sm-6 col-12', style: { textAlign: 'center' } },
                                React.createElement('p', { className: 'Poppins-regular' },
                                    React.createElement('b', null, 'Para'), React.createElement('br', null),
                                    'Telefonica Venezolana C.A.', React.createElement('br', null),
                                    'J003439940'
                                )
                            ),
                            all_data?.client_name && React.createElement(
                                'div',
                                { className: 'col-lg-6 col-md-6 col-sm-6 col-12', style: { textAlign: 'center' } },
                                React.createElement('p', { className: 'Poppins-regular' },
                                    React.createElement('b', null, 'De'), React.createElement('br', null),
                                    all_data.client_name, React.createElement('br', null),
                                    all_data.client_id_doc
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { style: { marginTop: '15px' }, className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-lg-6 col-md-6 col-sm-6 col-12', style: { textAlign: 'left' } },
                                React.createElement(
                                    'div',
                                    { style: { width: '100%' } },
                                    React.createElement('label', { className: 'Poppins-bold' },
                                        'Procesado por: ',
                                        item.ccr ? React.createElement('b', null, 'Consorcio Credicard') : item.collector_bank_acronym && React.createElement('b', null, item.collector_bank_acronym)
                                    ),
                                    item.ccr && React.createElement('img', { src: 'assets/images/credicard_horizontal.png', height: '40px' }),
                                    !item.ccr && item.collector_bank_thumbnail && React.createElement('img', { src: parsearImagen(item.collector_bank_thumbnail), height: '40px' })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-lg-6 col-md-6 col-sm-6 col-12', style: { textAlign: 'right' } },
                                all_data?.paid_at && React.createElement('label', { className: 'Poppins-regular', style: { marginTop: 0, marginBottom: 0, color: 'black', fontSize: '12px' } }, parseDate(all_data.paid_at), React.createElement('br', null)),
                                all_data?.sequence && React.createElement('label', { className: 'Poppins-regular', style: { marginTop: 0, marginBottom: 0, color: 'black', fontSize: '10px' } }, `Nº Orden: ${all_data.sequence}`)
                            )
                        )
                    )
                ))
            ),
            payment && React.createElement(
                'div',
                { className: 'col-lg-12 col-md-12 col-sm-12 col-12' },
                React.createElement('h4', { className: 'mb-3' }, 'Detalle del pago'),
                React.createElement(
                    'div',
                    { className: 'card' },
                    React.createElement(
                        'div',
                        { className: 'card-body', style: { padding: '20px' } },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-lg-6 col-md-6 col-sm-6 col-12 d-flex' },
                                React.createElement(
                                    'div',
                                    { style: { display: 'inline-block', marginRight: '10px', verticalAlign: 'top' } },
                                    payment.collector_bank_thumbnail && React.createElement('img', { src: parsearImagen(payment.collector_bank_thumbnail), width: '40px' })
                                ),
                                React.createElement(
                                    'div',
                                    { style: { display: 'flex' } },
                                    React.createElement(
                                        'div',
                                        null,
                                        payment.collector_bank_name && React.createElement('h5', { className: 'Poppins-light', style: { marginTop: 0, marginBottom: 0 } }, payment.collector_bank_name),
                                        payment.ccr ? React.createElement(
                                            'p',
                                            null,
                                            payment.ccr.card_type && React.createElement('label', { className: 'Poppins-regular', style: { marginTop: 0, marginBottom: 0, color: 'black', fontSize: '12px' } }, `Método: `, React.createElement('b', null, payment.ccr.card_type)),
                                            payment.ccr.affiliate && React.createElement('label', { className: 'Poppins-regular', style: { marginTop: 0, marginBottom: 0, color: 'black', fontSize: '12px' } }, `Afiliado: `, React.createElement('b', null, payment.ccr.affiliate)),
                                            payment.ccr.terminal && React.createElement('label', { className: 'Poppins-regular', style: { marginTop: 0, marginBottom: 0, color: 'black', fontSize: '12px' } }, `Terminal: `, React.createElement('b', null, payment.ccr.terminal)),
                                            payment.ccr.trace && React.createElement('label', { className: 'Poppins-regular', style: { marginTop: 0, marginBottom: 0, color: 'black', fontSize: '12px' } }, `Trace: `, React.createElement('b', null, payment.ccr.trace))
                                        ) : React.createElement(
                                            'p',
                                            null,
                                            payment.payment_method && React.createElement('label', { className: 'Poppins-regular', style: { marginTop: 0, marginBottom: 0, color: 'black', fontSize: '12px' } }, `Método: `, React.createElement('b', null, translate(payment.payment_method))),
                                            payment.payer_id_doc && React.createElement('label', { className: 'Poppins-regular', style: { marginTop: 0, marginBottom: 0, color: 'black', fontSize: '12px' } }, `RIF: `, React.createElement('b', null, payment.payer_id_doc)),
                                            payment.payer_phone && React.createElement('label', { className: 'Poppins-regular', style: { marginTop: 0, marginBottom: 0, color: 'black', fontSize: '12px' } }, `Telefono: `, React.createElement('b', null, parsePhone(payment.payer_phone)))
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-lg-6 col-md-6 col-sm-6 col-12', style: { textAlign: 'right' } },
                                payment.ccr?.approval && React.createElement('h4', { className: 'Poppins-bold', style: { marginTop: 0, marginBottom: 0, color: '#5bc500' } }, payment.ccr.approval),
                                !payment.ccr && payment.external_reference && React.createElement('h4', { className: 'Poppins-bold', style: { marginTop: 0, marginBottom: 0, color: '#5bc500' } }, payment.external_reference),
                                payment.payer_reference && React.createElement('h4', { className: 'Poppins-bold', style: { marginTop: 0, marginBottom: 0, color: '#5bc500' } }, payment.payer_reference),
                                React.createElement('label', { className: 'Poppins-regular', style: { marginTop: 0, marginBottom: 0, color: '#757575', fontSize: '14px' } },
                                    actual_status_icon && React.createElement('i', { className: actual_status_icon, 'aria-hidden': 'true' }),
                                    actual_status
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { style: { marginTop: '15px' }, className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-lg-12 col-md-12 col-sm-12 col-12', style: { textAlign: 'center' } },
                                all_data?.total_converted?.VED?.amount && React.createElement('h2', { className: 'Poppins-light', style: { color: 'black', marginBottom: 0 } },
                                    React.createElement('label', { className: 'Poppins-bold', style: { fontSize: '14px', marginBottom: 0 } }, 'Bs.'),
                                    ` ${parseAmount(payment.amount)}`
                                )
                            ),
                            all_data?.publication_name && React.createElement(
                                'div',
                                { className: 'col-lg-12 col-md-12 col-sm-12 col-12', style: { textAlign: 'center', color: '#9e9e9e' } },
                                React.createElement('h6', { className: 'Poppins-light', style: { color: 'black', marginTop: 0 } }, all_data.publication_name)
                            )
                        ),
                        React.createElement(
                            'div',
                            { style: { marginTop: '15px' }, className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-lg-6 col-md-6 col-sm-6 col-12', style: { textAlign: 'center' } },
                                React.createElement('p', { className: 'Poppins-regular' },
                                    React.createElement('b', null, 'Para'), React.createElement('br', null),
                                    'Telefonica Venezolana C.A.', React.createElement('br', null),
                                    'J003439940'
                                )
                            ),
                            all_data?.client_name && React.createElement(
                                'div',
                                { className: 'col-lg-6 col-md-6 col-sm-6 col-12', style: { textAlign: 'center' } },
                                React.createElement('p', { className: 'Poppins-regular' },
                                    React.createElement('b', null, 'De'), React.createElement('br', null),
                                    all_data.client_name, React.createElement('br', null),
                                    all_data.client_id_doc
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { style: { marginTop: '15px' }, className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-lg-6 col-md-6 col-sm-6 col-12', style: { textAlign: 'left' } },
                                React.createElement(
                                    'div',
                                    { style: { width: '100%' } },
                                    React.createElement('label', { className: 'Poppins-bold' },
                                        'Procesado por: ',
                                        payment.ccr ? React.createElement('b', null, 'Consorcio Credicard') : payment.collector_bank_acronym && React.createElement('b', null, payment.collector_bank_acronym)
                                    ),
                                    payment.ccr && React.createElement('img', { src: 'assets/images/credicard_horizontal.png', height: '40px' }),
                                    !payment.ccr && payment.collector_bank_thumbnail && React.createElement('img', { src: parsearImagen(payment.collector_bank_thumbnail), height: '40px' })
                                )
                            ),
                        ),
                    ),
                ),
            ),
        ),
        React.createElement('div', { className: 'row px-4', style: { display: all_data?.canceled ? 'block' : 'none' } },
            React.createElement('div', { className: 'col-lg-12 col-md-12 col-sm-12 col-12', style: { textAlign: 'right' } },
                React.createElement('p', { className: 'font-regular' }, 
                    real_data?.canceled_at && React.createElement( React.Fragment, null,
                        React.createElement(
                            'label',
                            { style: { fontSize: '13px' }, className: 'font-regular' },
                            React.createElement('b', { className: 'font-bold' }, 'Cancelado el:&nbsp;'),
                            parseDate2(real_data.canceled_at)
                        ),
                        React.createElement('br', null)
                    )
                )
            ),
            React.createElement('div', { className: 'row noPrint', style: { textAlign: 'right', marginTop: '25px', display: !(all_data?.canceled || all_data?.paid) ? 'flex' : 'none' } },
                React.createElement('div', { className: 'col-lg-6 col-md-6 col-sm-6 col-12 margin-conditional' },
                    React.createElement('button', { type: 'button', className: 'buttom-movistar-grey', style: { width: '100%', margin: '10px', marginLeft: '0px' }, onClick: openModalrechazarPago },
                        'RECHAZAR'
                    )
                ),
                React.createElement('div', { className: 'col-lg-6 col-md-6 col-sm-6 col-12 margin-conditional' },
                    !all_data?.confirmed ? ( React.createElement( 'button', { type: 'submit', className: 'buttom-movistar-primary', style: { width: '100%', margin: '10px', marginLeft: '0px' }, onClick: aprobarPago },
                            'CONFIRMAR'
                        )
                    ) : (
                        React.createElement( 'button', { type: 'submit', className: 'buttom-movistar-primary', style: { width: '100%', margin: '10px', marginLeft: '0px' }, onClick: redirect },
                            'SIGUIENTE'
                        )
                    )
                )
            ),
            React.createElement('div', { className: 'row noPrint', style: { textAlign: 'right', marginTop: '25px', display: (all_data?.canceled || all_data?.paid) ? 'flex' : 'none' } },
                React.createElement('div', { className: 'col-lg-6 col-md-6 col-sm-6 col-12' },
                    React.createElement('button',{ type: 'button', className: 'buttom-movistar-grey', style: { width: '100%' }, onClick: openCerrar },
                        'CERRAR'
                    )
                ),
                React.createElement('div', { className: 'col-lg-6 col-md-6 col-sm-6 col-12 margin-conditional' },
                    React.createElement('button',{ type: 'button', className: 'buttom-movistar-primary', style: { width: '100%' }, onClick: print },
                        'IMPRIMIR'
                    )
                )
            )
        ),        
    );
}