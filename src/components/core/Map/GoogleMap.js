import { createCustomEqual } from "fast-equals";
import {useRef,useState,useEffect,useMemo, Children, isValidElement, cloneElement} from "react";
import { Wrapper, Status} from "@googlemaps/react-wrapper";

export const GoogleMap = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {

  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map,options]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        window.google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};

export const Marker = ({onClickMarker, ...options}) => {
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }

    if(marker&&onClickMarker){
      marker.addListener("click", onClickMarker);
    }
  }, [marker, options]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a, b) => {

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}


function useDeepCompareEffectForMaps(
  callback,
  dependencies
) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}