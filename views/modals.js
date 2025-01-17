function sendModalValue(id,msg){
    let modal = document.getElementById(`${id}Body`);
    if (!(modal==undefined || modal==null)) {
        modal.innerText=msg;
        return;        
    }
}
const WarningModal = ({ bodyText }) => {
    return React.createElement('div', { id:"msgWarning", 'data-bs-backdrop':'static', 'data-keyboard':'false', className: 'modal fade bd-example-modal-sm', style: { overflow: 'hidden', marginTop: '60px' } },
        React.createElement('div', { className: 'modal-dialog', role: 'document' },
            React.createElement('div', { className: 'modal-content' },
                React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                    React.createElement('h5',{ className: 'modal-title font-regular', style: { color:'#FFC107' } },'Alerta'),
                    React.createElement('button',{ type: 'button', className: 'close', onClick: () => {$("#msgWarning").modal("hide")}, 'aria-label': 'Cerrar'},
                        React.createElement('span', { 'aria-hidden': 'true' }, '×')
                    )
                ),
                React.createElement('div', { className: 'modal-body'},                    
                    React.createElement('p', { id:"msgWarningBody" },'')
                ),
                React.createElement('div', { className: 'modal-footer' },
                    React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                            onClick: () => {$("#msgWarning").modal("hide")},
                        },
                        React.createElement('span',{className: 'font-regular' }, 'Cerrar')
                    )
                )
            )
        )
    );
};
const InfoModal = ({ bodyText }) => {
    return React.createElement('div', { id:"msgInfo", 'data-bs-backdrop':'static', 'data-keyboard':'false', className: 'modal fade bd-example-modal-sm', style: { overflow: 'hidden', marginTop: '60px' } },
        React.createElement('div', { className: 'modal-dialog', role: 'document' },
            React.createElement('div', { className: 'modal-content' },
                React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                    React.createElement('h5',{ className: 'modal-title font-regular', style: { color:'#2196F3' } },'Proceso satisfactorio'),
                    React.createElement('button',{ type: 'button', className: 'close', onClick: () => {$("#msgInfo").modal("hide")}, 'aria-label': 'Cerrar'},
                        React.createElement('span', { 'aria-hidden': 'true' }, '×')
                    )
                ),
                React.createElement('div', { className: 'modal-body'},
                    React.createElement('p', { id:"msgInfoBody" })
                ),
                React.createElement('div', { className: 'modal-footer' },
                    React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                            onClick: () => {$("#msgInfo").modal("hide")},
                        },
                        React.createElement('span',{className: 'font-regular' }, 'Cerrar')
                    )
                )
            )
        )
    );
};
const ErrorModal = ({ bodyText }) => {
    return React.createElement('div', { id:"msgError", 'data-bs-backdrop':'static', 'data-keyboard':'false', className: 'modal fade bd-example-modal-sm', style: { overflow: 'hidden', marginTop: '60px' } },
        React.createElement('div', { className: 'modal-dialog', role: 'document' },
            React.createElement('div', { className: 'modal-content' },
                React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                    React.createElement('h5',{ className: 'modal-title font-regular', style: { color:'#C51162' } },'Error'),
                    React.createElement('button',{ type: 'button', className: 'close', onClick: () => {$("#msgError").modal("hide")}, 'aria-label': 'Cerrar'},
                        React.createElement('span', { 'aria-hidden': 'true' }, '×')
                    )
                ),
                React.createElement('div', { className: 'modal-body'},
                    React.createElement('p', { id:"msgErrorBody" })
                ),
                React.createElement('div', { className: 'modal-footer' },
                    React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                            onClick: () => {$("#msgError").modal("hide")},
                        },
                        React.createElement('span',{className: 'font-regular' }, 'Cerrar')
                    )
                )
            )
        )
    );
};
const MsgModal = ({ bodyText }) => {
    return React.createElement('div', { id:"msgToken", 'data-bs-backdrop':'static', 'data-keyboard':'false', className: 'modal fade bd-example-modal-sm', style: { overflow: 'hidden', marginTop: '60px' } },
        React.createElement('div', { className: 'modal-dialog', role: 'document' },
            React.createElement('div', { className: 'modal-content' },
                React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                    React.createElement('h5',{ className: 'modal-title font-regular', style: { color:'#2196F3' } },'Proceso satisfactorio'),
                    React.createElement('button',{ type: 'button', className: 'close', onClick: () => {$("#msgToken").modal("hide")}, 'aria-label': 'Cerrar'},
                        React.createElement('span', { 'aria-hidden': 'true' }, '×')
                    )
                ),
                React.createElement('div', { className: 'modal-body'},
                    React.createElement('p', null,'Token enviado con exito')
                ),
                React.createElement('div', { className: 'modal-footer' },
                    React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                            onClick: () => {$("#msgToken").modal("hide")},
                        },
                        React.createElement('span',{className: 'font-regular' }, 'Cerrar')
                    )
                )
            )
        )
    );
};
const WarningP2P = ({ bodyText }) => {
    return React.createElement('div', { id:"msgWarningP2P", 'data-bs-backdrop':'static', 'data-keyboard':'false', className: 'modal fade bd-example-modal-sm', style: { overflow: 'hidden', marginTop: '60px' } },
        React.createElement('div', { className: 'modal-dialog', role: 'document' },
            React.createElement('div', { className: 'modal-content' },
                React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                    React.createElement('h5',{ className: 'modal-title font-regular', style: { color:'#FFC107' } },'Alerta'),
                    React.createElement('button',{ type: 'button', className: 'close', onClick: () => {$("#msgWarningP2P").modal("hide")}, 'aria-label': 'Cerrar'},
                        React.createElement('span', { 'aria-hidden': 'true' }, '×')
                    )
                ),
                React.createElement('div', { className: 'modal-body'},                    
                    React.createElement('p', null,'El monto a pagar debe ser exacto, para que su orden sea procesada de forma efectiva')
                ),
                React.createElement('div', { className: 'modal-footer' },
                    React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                            onClick: () => {$("#msgWarningP2P").modal("hide")},
                        },
                        React.createElement('span',{className: 'font-regular' }, 'Cerrar')
                    )
                )
            )
        )
    );
};