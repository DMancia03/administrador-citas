import React from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';

const Cita = ({item, eliminarPaciente}) => {

    const dialogoEliminar = id => {
        console.log('eliminando....', id);
        eliminarPaciente(id);
    }


    return (
        <>
        <Card>
            <Card.Title>Paciente: {item.paciente}</Card.Title>
            <Card.Divider/>
            <View>
                <Text style={styles.label}>Propietario: </Text>
                <Text style={styles.texto}>{item.propietario}</Text>
            </View>
            <View>
                <Text style={styles.label}>Síntomas: </Text>
                <Text style={styles.texto}>{item.sintomas}</Text>
            </View>
            <View>
                <TouchableHighlight onPress={ () => dialogoEliminar(item.id) } style={styles.btnEliminar}>
                    <Text style={styles.textoEliminar}> Eliminar &times; </Text>
                </TouchableHighlight>
            </View>
        </Card>
        </>
    )
}

const styles = StyleSheet.create({
    cita: {
        backgroundColor: '#FFF',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10
    },
    texto: {
        fontSize: 18,
    },
    btnEliminar: {
        padding: 10,
        backgroundColor: 'red',
        marginVertical: 10
    },
    textoEliminar: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
 
export default Cita;