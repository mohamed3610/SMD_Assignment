import * as axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import Carousel from 'react-native-snap-carousel';
import {
  View,
  Text,
  Button,
  FlatList,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { Card } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";

const ListScrean = () => {
  const route = useRoute<RouteProps>();
  const { term } = route.params;
  const [universities, setUniversity] = useState<University[]>();

  useEffect(() => {
    Promise.all([
      axios.default.get(`http://192.168.0.100:3000/universities/${term}`),
    ]).then(([{ data: universitiesResults }]) => {
      if (universitiesResults) setUniversity(universitiesResults);
    });
  }, []);
  return (
    <SafeAreaView>
      <View>
        <ScrollView>
          {term &&
            universities?.map((University, index: number) => (
              <Card
                key={index}
                containerStyle={{
                  borderRadius: 20,
                  borderColor: "transparent",
                }}
              >
                <Card.Title style={{ fontWeight: "bold", fontSize: 17 }}>
                 
                  <Text
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      color: "red",
                    }}
                  >
                    {University.name}
                  </Text>{" "}
                </Card.Title>

                <Card.Divider />
                <Carousel
        layout='default'
        data={University.image}
        sliderWidth={300}
        itemWidth={300}
        renderItem={({ item, index }) => (
          <Image
            key={index}
            style={{ width: '100%', height: 200 }}
            resizeMode='contain'
            source={{uri:item?item:"https://cdn1.vectorstock.com/i/thumb-large/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg"}}
          />
        )}
      />
              
                <Text style={{ marginBottom: 10, fontSize: 16 }}>
                  Located at : {University.addressFmt}
                </Text>
              </Card>
            ))}

          <View style={{ marginTop: 100 }}>
            <Text> </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

type RouteParams = {
  term: string;
};

type RouteProps = {
  params: RouteParams;
  name: string;
  key: string;
};

type University = {
  name: string;
  slug: string;
  addressFmt: string;
  image: string[];
};

export default ListScrean;