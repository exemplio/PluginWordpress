const WarningModal = ({ bodyText }) => {
    return React.createElement('div', { id:"msgWarning", className: 'modal fade bd-example-modal-sm', style: { overflow: 'hidden', marginTop: '60px' } },
        React.createElement('div', { className: 'modal-dialog', role: 'document' },
            React.createElement('div', { className: 'modal-content' },
                React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                    React.createElement('h5',{ className: 'modal-title font-regular', style: { color:'#FFC107' } },'Alerta'),
                    React.createElement('button',{ type: 'button', className: 'close', onClick: () => {$("#msgWarning").modal("hide")}, 'aria-label': 'Close'},
                        React.createElement('span', { 'aria-hidden': 'true' }, '×')
                    )
                ),
                React.createElement('div', { className: 'modal-body'},
                    console.log(bodyText),
                    
                    React.createElement('span',{className: 'font-regular' }, bodyText)
                ),
                React.createElement('div', { className: 'modal-footer' },
                    React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                            onClick: () => {$("#msgWarning").modal("hide")},
                        },
                        React.createElement('span',{className: 'font-regular' }, 'Close')
                    )
                )
            )
        )
    );
};
const InfoModal = ({ bodyText }) => {
    return React.createElement('div', { id:"msgInfo", className: 'modal fade bd-example-modal-sm', style: { overflow: 'hidden', marginTop: '60px' } },
        React.createElement('div', { className: 'modal-dialog', role: 'document' },
            React.createElement('div', { className: 'modal-content' },
                React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                    React.createElement('h5',{ className: 'modal-title font-regular', style: { color:'#2196F3' } },'Proceso satisfactorio'),
                    React.createElement('button',{ type: 'button', className: 'close', onClick: () => {$("#msgInfo").modal("hide")}, 'aria-label': 'Close'},
                        React.createElement('span', { 'aria-hidden': 'true' }, '×')
                    )
                ),
                React.createElement('div', { className: 'modal-body'},
                    React.createElement('p', null, bodyText)
                ),
                React.createElement('div', { className: 'modal-footer' },
                    React.createElement('button',{ type: 'button', className: 'btn btn-primary',
                            onClick: () => {
                                console.log("");
                            },
                        },
                        React.createElement('span',{className: 'font-regular' }, 'Save changes')
                    ),
                    React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                            onClick: () => {$("#msgInfo").modal("hide")},
                        },
                        React.createElement('span',{className: 'font-regular' }, 'Close')
                    )
                )
            )
        )
    );
};
const ErrorModal = ({ bodyText }) => {
    return React.createElement('div', { id:"msgError", className: 'modal fade bd-example-modal-sm', style: { overflow: 'hidden', marginTop: '60px' } },
        React.createElement('div', { className: 'modal-dialog', role: 'document' },
            React.createElement('div', { className: 'modal-content' },
                React.createElement('div', { className: 'modal-header', style:{justifyContent:'space-between'} },
                    React.createElement('h5',{ className: 'modal-title font-regular', style: { color:'#C51162' } },'Error'),
                    React.createElement('button',{ type: 'button', className: 'close', onClick: () => {$("#msgError").modal("hide")}, 'aria-label': 'Close'},
                        React.createElement('span', { 'aria-hidden': 'true' }, '×')
                    )
                ),
                React.createElement('div', { className: 'modal-body'},
                    React.createElement('p', null, bodyText)
                ),
                React.createElement('div', { className: 'modal-footer' },
                    React.createElement('button',{ type: 'button', className: 'btn btn-secondary',
                            onClick: () => {$("#msgError").modal("hide")},
                        },
                        React.createElement('span',{className: 'font-regular' }, 'Close')
                    )
                )
            )
        )
    );
};