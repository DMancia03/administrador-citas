import React, {useState} from "react";
import { Field, Form, Formik } from "formik";
import * as YUP from 'yup';
import { Text } from "react-native-elements";
import { ScrollView, TextInput, View, StyleSheet, TouchableHighlight, Button, Alert } from "react-native";
import colors from "../src/utils/color";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from "react-id-generator";

const ValidationNewCita = YUP.object().shape({
    paciente: YUP.string().required('Debe escribir el nombre del paciente.'),
    propietario: YUP.string().required('Debe escribir el nombre del propietario.'),
    telefono: YUP.string().required('Debe escribir su telefono.'),
    //fecha: YUP.date().required('Debe escribir la fecha de la cita.'),
    //hora: YUP.date().required('Debe escribir la hora de la cita.'),
    sintomas: YUP.string().required('Debe escribir los síntomas que presenta el paciente.')
  });
  
const FormularioCita = ({ citas, setCitas,  guardarMostrarForm, guardarCitasStorage}) => {
    //Variables para controlar la fecha y hora
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    //Eventos para controlar la fecha
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
   
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
   
    const confirmarFecha = date => {
        const opciones = { year: 'numeric', month: 'long', day: "2-digit" };
        guardarFecha(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };

    //Evento para controlar la hora
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
  
  
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };
  
  
    const confirmarHora = hora => {
        const opciones = { hour: 'numeric', minute: '2-digit', hour12: false};
        guardarHora(hora.toLocaleString('es-ES', opciones));
        hideTimePicker();
    };

    //Alerta por validacion general
    const mostrarAlerta = () => {
        Alert.alert(
            'Error', // Titulo
            'Todos los campos son obligatorios', // mensaje
            [{
                text: 'OK' // Arreglo de botones
            }]
        )
    }

    //Guardar cita
    const crearNuevaCita = (values) => {
        //Validar manualmente la fecha y hora
        if(fecha.trim() === '' || hora.trim() === ''){
            mostrarAlerta();
            return;
        }

        //Crear objeto cita
        const cita = { ...values, fecha, hora };
        cita.id = shortid();

        // Agregar al state
        const citasNuevo = [...citas, cita];
        setCitas(citasNuevo);

        // Ocultar el formulario
        guardarMostrarForm(false);
    }

    /*,fecha:'',hora:'',sintomas:'' */
    return (
        <>
        <Formik 
            initialValues={{paciente:'', propietario:'', telefono:'', sintomas:''}}
            validationSchema={ValidationNewCita}
            onSubmit={(values) => {
                crearNuevaCita(values)
            }}>
                {
                    ({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                        <ScrollView>
                            {/* Paciente */}
                            <View>
                                <Text style={styles.label}>Nombre del paciente:</Text>
                                <TextInput
                                    style={styles.input}
                                    name='paciente'
                                    onChangeText={handleChange('paciente')}
                                    onBlur={handleBlur('paciente')}
                                    value={values.paciente}
                                />
                                {errors.paciente && touched.paciente ? <Text>{errors.paciente}</Text> : null}
                            </View>
                            {/* Propietario */}
                            <View>
                                <Text style={styles.label}>Dueño:</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('propietario')}
                                    onBlur={handleBlur('propietario')}
                                    value={values.propietario}
                                />
                                {errors.propietario && touched.propietario ? <Text>{errors.propietario}</Text> : null}
                            </View>
                            {/* Telefono */}
                            <View>
                                <Text style={styles.label}>Teléfono Contacto:</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('telefono')}
                                    onBlur={handleBlur('telefono')}
                                    value={values.telefono}
                                    keyboardType='numeric'
                                />
                                {errors.telefono && touched.telefono ? <Text>{errors.telefono}</Text> : null}
                            </View>
                            {/* Fecha */}
                            <View>
                                <Text style={styles.label}>Fecha:</Text>
                                <Button title="Seleccionar fecha" onPress={showDatePicker} />
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={confirmarFecha}
                                    onCancel={hideDatePicker}
                                    locale='es_ES'
                                    headerTextIOS="Elige la fecha"
                                    cancelTextIOS="Cancelar"
                                    confirmTextIOS="Confirmar"
                                />
                                <Text>{fecha}</Text>
                            </View>
                            {/* Hora */}
                            <View>
                                <Text style={styles.label}>Hora:</Text>
                                <Button title="Seleccionar hora" onPress={showTimePicker} />
                                <DateTimePickerModal
                                    isVisible={isTimePickerVisible}
                                    mode="time"
                                    onConfirm={confirmarHora}
                                    onCancel={hideTimePicker}
                                    locale='es_ES'
                                    headerTextIOS="Elige una Hora"
                                    cancelTextIOS="Cancelar"
                                    confirmTextIOS="Confirmar"
                                />
                            <Text>{hora}</Text>
                            </View>
                            {/* Sintomas */}
                            <View>
                                <Text style={styles.label}>Síntomas:</Text>
                                <TextInput
                                    multiline
                                    style={styles.input}
                                    onChangeText={handleChange('sintomas')}
                                    onBlur={handleBlur('sintomas')}
                                    value={values.sintomas}
                                />
                                {errors.sintomas && touched.sintomas ? <Text>{errors.sintomas}</Text> : null}
                            </View>
                            {/* Enviar formulario */}
                            <View>
                                <TouchableHighlight onPress={ handleSubmit} style={styles.btnSubmit}>
                                    <Text style={styles.textoSubmit}>Crear Nueva Cita</Text>
                                </TouchableHighlight>
                            </View>
                        </ScrollView>
                    )
                }
            </Formik>
        </>
    )
};

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor:colors.BUTTON_COLOR,
        marginVertical: 10
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default FormularioCita;