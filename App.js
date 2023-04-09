import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

export default function App() {
  const [altitude, setAltitude] = useState(Number);
  const [longitude, setLongitude] = useState(Number);
  const [latitude, setLatitude] = useState(Number);
  const [altAccuracy, setAltAccuracy] = useState(Number);
  const [activeUnit, setActiveUnit] = useState("m");
  const [alt, setAlt] = useState(Number);

  useEffect(() => {
    handleGetLocationDetails();
  }, []);

  useEffect(() => {
    setInterval(() => {
     handleGetLocationDetails()
    }, 3000);
  }, []);

  useEffect(() => {
    if (activeUnit === "m") {
      setAlt(altitude);
    } else {
      setAlt(altitude * 3.281);
    }
  }, [activeUnit, altitude]);

  const handleGetLocationDetails = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
  
    setAltitude(location.coords.altitude);
    setLongitude(location.coords.longitude);
    setLatitude(location.coords.latitude);
    setAltAccuracy(location.coords.altitudeAccuracy);
  };

  const handleDecimalPlace = (value) => {
    if (value) {
      return Number(value).toFixed(2);
    }
    return value;
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            marginRight: 5,
            color: "grey",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Longitude:
        </Text>
        <Text style={{ fontWeight: "700", fontSize: 16 }}>
          {handleDecimalPlace(longitude)}
          {/* {longitude} */}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            marginRight: 5,
            color: "grey",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Latitude:
        </Text>
        <Text style={{ fontWeight: "700", fontSize: 16 }}>
          {handleDecimalPlace(latitude)}
          {/* {latitude} */}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            marginRight: 5,
            color: "grey",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Altitude:
        </Text>
        <Text style={{ fontWeight: "700", fontSize: 16 }}>
          {handleDecimalPlace(alt)} {activeUnit}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            marginRight: 5,
            color: "grey",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Altitude Accuracy:
        </Text>
        <Text style={{ fontWeight: "700", fontSize: 16 }}>
          {handleDecimalPlace(altAccuracy)}
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            color: "grey",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Toggle Altitude in feat or meters
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setActiveUnit("m");
            }}
            style={{
              backgroundColor: activeUnit === "m" ? "#1B98E0" : "grey",
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", fontSize: 14, fontWeight: "600" }}>
              metres
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActiveUnit("f");
            }}
            style={{
              backgroundColor: activeUnit === "f" ? "#1B98E0" : "grey",
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", fontSize: 14, fontWeight: "600" }}>
              feat
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F6",
    alignItems: "center",
    justifyContent: "center",
  },
});
