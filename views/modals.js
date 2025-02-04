function sendModalValue(id,msg){
    let modal = document.getElementById(`${id}Body`);
    if (!(modal==undefined || modal==null)) {
        modal.innerText=msg;
        return;        
    }
}

function openModal(modal) {
    let modalClass = document.getElementById(modal); 
    if (Boolean(modalClass)) {
        modalClass.classList.replace('hide', 'show');
        return;
    }
}

function closeModal(modal) {
    let modalClass = document.getElementById(modal); 
    if (Boolean(modalClass)) {
        modalClass.classList.replace('show', 'hide');
        return;
    }
}

const WarningModal = ({ bodyText }) => {
    return React.createElement('div', { id:"msgWarning", 'data-bs-backdrop':'static', 'data-keyboard':'false' , className: 'modal fade bd-example-modal-sm hide modal-backdrop', style: { overflow: 'hidden', textAlign : 'center', paddingLeft: '19px;', display : 'none', opacity: '0.94' } },
        React.createElement('div', { className: 'modal-dialog', role: 'document', style: { marginTop: '60px', } },
            React.createElement('div', { className: 'modal-content' },
                React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                    React.createElement('h5',{ className: 'modal-title font-regular', style: { color:'#FFC107' } },'Alerta'),
                    React.createElement('button',{ type: 'button', className: 'close', onClick: () => {closeModal('msgWarning')}, 'aria-label': 'Cerrar'},
                        React.createElement('span', { 'aria-hidden': 'true' }, '×')
                    )
                ),
                React.createElement('div', { className: 'modal-body'},                    
                    React.createElement('p', { id:"msgWarningBody", className: 'font-regular' },'')
                ),
                React.createElement('div', { className: 'modal-footer' },
                    React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                            onClick: () => {closeModal('msgWarning')},
                        },
                        React.createElement('span',{className: 'font-regular' }, 'Cerrar')
                    )
                )
            )
        )
    );
};
const InfoModal = ({ bodyText }) => {
    return React.createElement('div', { id:"msgInfo", 'data-bs-backdrop':'static', 'data-keyboard':'false' , className: 'modal fade bd-example-modal-sm hide modal-backdrop', style: { overflow: 'hidden', textAlign : 'center', paddingLeft: '19px;', display : 'none', opacity: '0.94' } },
        React.createElement('div', { className: 'modal-dialog', role: 'document', style: { marginTop: '60px', } },
            React.createElement('div', { className: 'modal-content' },
                React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                    React.createElement('h5',{ className: 'modal-title font-regular', style: { color:'#2196F3' } },'Proceso satisfactorio'),
                    React.createElement('button',{ type: 'button', className: 'close', onClick: () => {closeModal('msgInfo')}, 'aria-label': 'Cerrar'},
                        React.createElement('span', { 'aria-hidden': 'true' }, '×')
                    )
                ),
                React.createElement('div', { className: 'modal-body'},
                    React.createElement('p', { id:"msgInfoBody", className: 'font-regular' })
                ),
                React.createElement('div', { className: 'modal-footer' },
                    React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                            onClick: () => {closeModal('msgInfo')},
                        },
                        React.createElement('span',{className: 'font-regular' }, 'Cerrar')
                    )
                )
            )
        )
    );
};
const ErrorModal = ({ bodyText }) => {
    return React.createElement('div', { id:"msgError", 'data-bs-backdrop':'static', 'data-keyboard':'false' , className: 'modal fade bd-example-modal-sm hide modal-backdrop', style: { overflow: 'hidden', textAlign : 'center', paddingLeft: '19px;', display : 'none', opacity: '0.94' } },
        React.createElement('div', { className: 'modal-dialog', role: 'document', style: { marginTop: '60px', } },
            React.createElement('div', { className: 'modal-content' },
                React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                    React.createElement('h5',{ className: 'modal-title font-regular', style: { color:'#C51162' } },'Error'),
                    React.createElement('button',{ type: 'button', className: 'close', onClick: () => {closeModal('msgError')}, 'aria-label': 'Cerrar'},
                        React.createElement('span', { 'aria-hidden': 'true' }, '×')
                    )
                ),
                React.createElement('div', { className: 'modal-body'},
                    React.createElement('p', { id:"msgErrorBody", className: 'font-regular' })
                ),
                React.createElement('div', { className: 'modal-footer' },
                    React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                            onClick: () => {closeModal('msgError')},
                        },
                        React.createElement('span',{className: 'font-regular' }, 'Cerrar')
                    )
                )
            )
        )
    );
};
const MsgModal = ({ bodyText }) => {
    return React.createElement('div', { id:"msgToken", 'data-bs-backdrop':'static', 'data-keyboard':'false' , className: 'modal fade bd-example-modal-sm hide modal-backdrop', style: { overflow: 'hidden', textAlign : 'center', paddingLeft: '19px;', display : 'none', opacity: '0.94' } },
        React.createElement('div', { className: 'modal-dialog', role: 'document', style: { marginTop: '60px', } },
            React.createElement('div', { className: 'modal-content' },
                React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                    React.createElement('h5',{ className: 'modal-title font-regular', style: { color:'#2196F3' } },'Proceso satisfactorio'),
                    React.createElement('button',{ type: 'button', className: 'close', onClick: () => {closeModal('msgToken')}, 'aria-label': 'Cerrar'},
                        React.createElement('span', { 'aria-hidden': 'true' }, '×')
                    )
                ),
                React.createElement('div', { className: 'modal-body'},
                    React.createElement('p', { className: 'font-regular' },'Token enviado con exito')
                ),
                React.createElement('div', { className: 'modal-footer' },
                    React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                            onClick: () => {closeModal('msgToken')},
                        },
                        React.createElement('span',{className: 'font-regular' }, 'Cerrar')
                    )
                )
            )
        )
    );
};
const WarningP2P = ({ bodyText }) => {
    return React.createElement('div', { id:"msgWarningP2P", 'data-bs-backdrop':'static', 'data-keyboard':'false' , className: 'modal fade bd-example-modal-sm hide modal-backdrop', style: { overflow: 'hidden', textAlign : 'center', paddingLeft: '19px;', display : 'none', opacity: '0.94' } },
        React.createElement('div', { className: 'modal-dialog', role: 'document', style: { marginTop: '60px', } },
            React.createElement('div', { className: 'modal-content' },
                React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                    React.createElement('h5',{ className: 'modal-title font-regular', style: { color:'#FFC107' } },'Alerta'),
                    React.createElement('button',{ type: 'button', className: 'close', onClick: () => {closeModal('msgWarningP2P')}, 'aria-label': 'Cerrar'},
                        React.createElement('span', { 'aria-hidden': 'true' }, '×')
                    )
                ),
                React.createElement('div', { className: 'modal-body'},                    
                    React.createElement('p', {className: 'font-regular'} ,'El monto a pagar debe ser exacto, para que su orden sea procesada de forma efectiva')
                ),
                React.createElement('div', { className: 'modal-footer' },
                    React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                            onClick: () => {closeModal('msgWarningP2P')},
                        },
                        React.createElement('span',{className: 'font-regular' }, 'Cerrar')
                    )
                )
            )
        )
    );
};