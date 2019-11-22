export default [
  {
    id: 'dragon1',
    name: 'Dragon 1',
    type: 'capsule',
    active: true,
    crew_capacity: 0,
    sidewall_angle_deg: 15,
    orbit_duration_yr: 2,
    dry_mass_kg: 4200,
    dry_mass_lb: 9300,
    first_flight: '2010-12-8',
    heat_shield: {
      material: 'PICA-X',
      size_meters: 3.6,
      temp_degrees: 3000,
      dev_partner: 'NASA',
    },
    thrusters: [
      {
        type: 'Draco',
        amount: 18,
        pods: 4,
        fuel_1: 'nitrogen tetroxide',
        fuel_2: 'monomethylhydrazine',
        thrust: {
          kN: 0.4,
          lbf: 90,
        },
      },
    ],
    launch_payload_mass: {
      kg: 6000,
      lb: 13228,
    },
    launch_payload_vol: {
      cubic_meters: 25,
      cubic_feet: 883,
    },
    return_payload_mass: {
      kg: 3000,
      lb: 6614,
    },
    return_payload_vol: {
      cubic_meters: 11,
      cubic_feet: 388,
    },
    pressurized_capsule: {
      payload_volume: {
        cubic_meters: 11,
        cubic_feet: 388,
      },
    },
    trunk: {
      trunk_volume: {
        cubic_meters: 14,
        cubic_feet: 494,
      },
      cargo: {
        solar_array: 2,
        unpressurized_cargo: true,
      },
    },
    height_w_trunk: {
      meters: 7.2,
      feet: 23.6,
    },
    diameter: {
      meters: 3.7,
      feet: 12,
    },
    wikipedia: 'https://en.wikipedia.org/wiki/SpaceX_Dragon',
    description: 'Dragon is a reusable spacecraft developed by SpaceX, an American private space transportation company based in Hawthorne, California. Dragon is launched into space by the SpaceX Falcon 9 two-stage-to-orbit launch vehicle. The Dragon spacecraft was originally designed for human travel, but so far has only been used to deliver cargo to the International Space Station (ISS).',
  },
  {
    id: 'dragon2',
    name: 'Dragon 2',
    type: 'capsule',
    active: false,
    crew_capacity: 7,
    sidewall_angle_deg: 15,
    orbit_duration_yr: 2,
    dry_mass_kg: 6350,
    dry_mass_lb: 14000,
    first_flight: null,
    heat_shield: {
      material: 'PICA-X',
      size_meters: 3.6,
      temp_degrees: 3000,
      dev_partner: 'NASA',
    },
    thrusters: [
      {
        type: 'Draco',
        amount: 18,
        pods: 4,
        fuel_1: 'nitrogen tetroxide',
        fuel_2: 'monomethylhydrazine',
        thrust: {
          kN: 0.4,
          lbf: 90,
        },
      },
      {
        type: 'SuperDraco',
        amount: 8,
        pods: 4,
        fuel_1: 'dinitrogen tetroxide',
        fuel_2: 'monomethylhydrazine',
        thrust: {
          kN: 71,
          lbf: 16000,
        },
      },
    ],
    launch_payload_mass: {
      kg: 6000,
      lb: 13228,
    },
    launch_payload_vol: {
      cubic_meters: 25,
      cubic_feet: 883,
    },
    return_payload_mass: {
      kg: 3000,
      lb: 6614,
    },
    return_payload_vol: {
      cubic_meters: 11,
      cubic_feet: 388,
    },
    pressurized_capsule: {
      payload_volume: {
        cubic_meters: 11,
        cubic_feet: 388,
      },
    },
    trunk: {
      trunk_volume: {
        cubic_meters: 14,
        cubic_feet: 494,
      },
      cargo: {
        solar_array: 2,
        unpressurized_cargo: true,
      },
    },
    height_w_trunk: {
      meters: 7.2,
      feet: 23.6,
    },
    diameter: {
      meters: 3.7,
      feet: 12,
    },
    wikipedia: 'https://en.wikipedia.org/wiki/Dragon_2',
    description: 'Dragon 2 (also Crew Dragon, Dragon V2, or formerly DragonRider) is the second version of the SpaceX Dragon spacecraft, which will be a human-rated vehicle. It includes a set of four side-mounted thruster pods with two SuperDraco engines each, which can serve as a launch escape system or launch abort system (LAS). In addition, it has much larger windows, new flight computers and avionics, and redesigned solar arrays, and a modified outer mold line from the initial cargo Dragon that has been flying for several years.',
  },
];
