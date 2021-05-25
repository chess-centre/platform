/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
      id
      pgn
      memberID
      eventID
      Opponent
      Colour
      Result
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame {
    onUpdateGame {
      id
      pgn
      memberID
      eventID
      Opponent
      Colour
      Result
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame {
    onDeleteGame {
      id
      pgn
      memberID
      eventID
      Opponent
      Colour
      Result
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEventPairing = /* GraphQL */ `
  subscription OnCreateEventPairing {
    onCreateEventPairing {
      id
      eventName
      round
      pairing
      result
      complete
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateEventPairing = /* GraphQL */ `
  subscription OnUpdateEventPairing {
    onUpdateEventPairing {
      id
      eventName
      round
      pairing
      result
      complete
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteEventPairing = /* GraphQL */ `
  subscription OnDeleteEventPairing {
    onDeleteEventPairing {
      id
      eventName
      round
      pairing
      result
      complete
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePlan = /* GraphQL */ `
  subscription OnCreatePlan {
    onCreatePlan {
      id
      key
      stripePriceId
      stripeProductId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePlan = /* GraphQL */ `
  subscription OnUpdatePlan {
    onUpdatePlan {
      id
      key
      stripePriceId
      stripeProductId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePlan = /* GraphQL */ `
  subscription OnDeletePlan {
    onDeletePlan {
      id
      key
      stripePriceId
      stripeProductId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEventType = /* GraphQL */ `
  subscription OnCreateEventType {
    onCreateEventType {
      id
      name
      description
      url
      color
      time
      maxEntries
      stripePriceId
      timeControl
      eventType
      defaultPrice
      canRegister
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateEventType = /* GraphQL */ `
  subscription OnUpdateEventType {
    onUpdateEventType {
      id
      name
      description
      url
      color
      time
      maxEntries
      stripePriceId
      timeControl
      eventType
      defaultPrice
      canRegister
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteEventType = /* GraphQL */ `
  subscription OnDeleteEventType {
    onDeleteEventType {
      id
      name
      description
      url
      color
      time
      maxEntries
      stripePriceId
      timeControl
      eventType
      defaultPrice
      canRegister
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFidePlayer = /* GraphQL */ `
  subscription OnCreateFidePlayer {
    onCreateFidePlayer {
      id
      fideId
      federation
      title
      currentRating
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFidePlayer = /* GraphQL */ `
  subscription OnUpdateFidePlayer {
    onUpdateFidePlayer {
      id
      fideId
      federation
      title
      currentRating
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFidePlayer = /* GraphQL */ `
  subscription OnDeleteFidePlayer {
    onDeleteFidePlayer {
      id
      fideId
      federation
      title
      currentRating
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMember = /* GraphQL */ `
  subscription OnCreateMember {
    onCreateMember {
      id
      about
      fideId
      ecfId
      username
      name
      email
      eventsByEmail
      promoByEmail
      eventsByText
      promoByText
      ecfRating
      membershipType
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Games {
        items {
          id
          pgn
          memberID
          eventID
          Opponent
          Colour
          Result
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      stripeCustomerId
      stripeCurrentPeriodEnd
      stripePriceId
      stripeProductId
      entries {
        items {
          id
          eventId
          memberId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          member {
            id
            about
            fideId
            ecfId
            username
            name
            email
            eventsByEmail
            promoByEmail
            eventsByText
            promoByText
            ecfRating
            membershipType
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            Games {
              nextToken
              startedAt
            }
            stripeCustomerId
            stripeCurrentPeriodEnd
            stripePriceId
            stripeProductId
            entries {
              nextToken
              startedAt
            }
          }
          event {
            id
            name
            description
            rounds
            time
            startDate
            endDate
            maxEntries
            entryCount
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            Games {
              nextToken
              startedAt
            }
            type {
              id
              name
              description
              url
              color
              time
              maxEntries
              stripePriceId
              timeControl
              eventType
              defaultPrice
              canRegister
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            entries {
              nextToken
              startedAt
            }
          }
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onUpdateMember = /* GraphQL */ `
  subscription OnUpdateMember {
    onUpdateMember {
      id
      about
      fideId
      ecfId
      username
      name
      email
      eventsByEmail
      promoByEmail
      eventsByText
      promoByText
      ecfRating
      membershipType
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Games {
        items {
          id
          pgn
          memberID
          eventID
          Opponent
          Colour
          Result
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      stripeCustomerId
      stripeCurrentPeriodEnd
      stripePriceId
      stripeProductId
      entries {
        items {
          id
          eventId
          memberId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          member {
            id
            about
            fideId
            ecfId
            username
            name
            email
            eventsByEmail
            promoByEmail
            eventsByText
            promoByText
            ecfRating
            membershipType
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            Games {
              nextToken
              startedAt
            }
            stripeCustomerId
            stripeCurrentPeriodEnd
            stripePriceId
            stripeProductId
            entries {
              nextToken
              startedAt
            }
          }
          event {
            id
            name
            description
            rounds
            time
            startDate
            endDate
            maxEntries
            entryCount
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            Games {
              nextToken
              startedAt
            }
            type {
              id
              name
              description
              url
              color
              time
              maxEntries
              stripePriceId
              timeControl
              eventType
              defaultPrice
              canRegister
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            entries {
              nextToken
              startedAt
            }
          }
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onDeleteMember = /* GraphQL */ `
  subscription OnDeleteMember {
    onDeleteMember {
      id
      about
      fideId
      ecfId
      username
      name
      email
      eventsByEmail
      promoByEmail
      eventsByText
      promoByText
      ecfRating
      membershipType
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Games {
        items {
          id
          pgn
          memberID
          eventID
          Opponent
          Colour
          Result
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      stripeCustomerId
      stripeCurrentPeriodEnd
      stripePriceId
      stripeProductId
      entries {
        items {
          id
          eventId
          memberId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          member {
            id
            about
            fideId
            ecfId
            username
            name
            email
            eventsByEmail
            promoByEmail
            eventsByText
            promoByText
            ecfRating
            membershipType
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            Games {
              nextToken
              startedAt
            }
            stripeCustomerId
            stripeCurrentPeriodEnd
            stripePriceId
            stripeProductId
            entries {
              nextToken
              startedAt
            }
          }
          event {
            id
            name
            description
            rounds
            time
            startDate
            endDate
            maxEntries
            entryCount
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            Games {
              nextToken
              startedAt
            }
            type {
              id
              name
              description
              url
              color
              time
              maxEntries
              stripePriceId
              timeControl
              eventType
              defaultPrice
              canRegister
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            entries {
              nextToken
              startedAt
            }
          }
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
      id
      name
      description
      rounds
      time
      startDate
      endDate
      maxEntries
      entryCount
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Games {
        items {
          id
          pgn
          memberID
          eventID
          Opponent
          Colour
          Result
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      type {
        id
        name
        description
        url
        color
        time
        maxEntries
        stripePriceId
        timeControl
        eventType
        defaultPrice
        canRegister
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      entries {
        items {
          id
          eventId
          memberId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          member {
            id
            about
            fideId
            ecfId
            username
            name
            email
            eventsByEmail
            promoByEmail
            eventsByText
            promoByText
            ecfRating
            membershipType
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            Games {
              nextToken
              startedAt
            }
            stripeCustomerId
            stripeCurrentPeriodEnd
            stripePriceId
            stripeProductId
            entries {
              nextToken
              startedAt
            }
          }
          event {
            id
            name
            description
            rounds
            time
            startDate
            endDate
            maxEntries
            entryCount
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            Games {
              nextToken
              startedAt
            }
            type {
              id
              name
              description
              url
              color
              time
              maxEntries
              stripePriceId
              timeControl
              eventType
              defaultPrice
              canRegister
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            entries {
              nextToken
              startedAt
            }
          }
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
      id
      name
      description
      rounds
      time
      startDate
      endDate
      maxEntries
      entryCount
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Games {
        items {
          id
          pgn
          memberID
          eventID
          Opponent
          Colour
          Result
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      type {
        id
        name
        description
        url
        color
        time
        maxEntries
        stripePriceId
        timeControl
        eventType
        defaultPrice
        canRegister
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      entries {
        items {
          id
          eventId
          memberId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          member {
            id
            about
            fideId
            ecfId
            username
            name
            email
            eventsByEmail
            promoByEmail
            eventsByText
            promoByText
            ecfRating
            membershipType
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            Games {
              nextToken
              startedAt
            }
            stripeCustomerId
            stripeCurrentPeriodEnd
            stripePriceId
            stripeProductId
            entries {
              nextToken
              startedAt
            }
          }
          event {
            id
            name
            description
            rounds
            time
            startDate
            endDate
            maxEntries
            entryCount
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            Games {
              nextToken
              startedAt
            }
            type {
              id
              name
              description
              url
              color
              time
              maxEntries
              stripePriceId
              timeControl
              eventType
              defaultPrice
              canRegister
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            entries {
              nextToken
              startedAt
            }
          }
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
      id
      name
      description
      rounds
      time
      startDate
      endDate
      maxEntries
      entryCount
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Games {
        items {
          id
          pgn
          memberID
          eventID
          Opponent
          Colour
          Result
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      type {
        id
        name
        description
        url
        color
        time
        maxEntries
        stripePriceId
        timeControl
        eventType
        defaultPrice
        canRegister
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      entries {
        items {
          id
          eventId
          memberId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          member {
            id
            about
            fideId
            ecfId
            username
            name
            email
            eventsByEmail
            promoByEmail
            eventsByText
            promoByText
            ecfRating
            membershipType
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            Games {
              nextToken
              startedAt
            }
            stripeCustomerId
            stripeCurrentPeriodEnd
            stripePriceId
            stripeProductId
            entries {
              nextToken
              startedAt
            }
          }
          event {
            id
            name
            description
            rounds
            time
            startDate
            endDate
            maxEntries
            entryCount
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            Games {
              nextToken
              startedAt
            }
            type {
              id
              name
              description
              url
              color
              time
              maxEntries
              stripePriceId
              timeControl
              eventType
              defaultPrice
              canRegister
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            entries {
              nextToken
              startedAt
            }
          }
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onCreateEntry = /* GraphQL */ `
  subscription OnCreateEntry {
    onCreateEntry {
      id
      eventId
      memberId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      member {
        id
        about
        fideId
        ecfId
        username
        name
        email
        eventsByEmail
        promoByEmail
        eventsByText
        promoByText
        ecfRating
        membershipType
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Games {
          items {
            id
            pgn
            memberID
            eventID
            Opponent
            Colour
            Result
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          nextToken
          startedAt
        }
        stripeCustomerId
        stripeCurrentPeriodEnd
        stripePriceId
        stripeProductId
        entries {
          items {
            id
            eventId
            memberId
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            member {
              id
              about
              fideId
              ecfId
              username
              name
              email
              eventsByEmail
              promoByEmail
              eventsByText
              promoByText
              ecfRating
              membershipType
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
              stripeCustomerId
              stripeCurrentPeriodEnd
              stripePriceId
              stripeProductId
            }
            event {
              id
              name
              description
              rounds
              time
              startDate
              endDate
              maxEntries
              entryCount
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
          }
          nextToken
          startedAt
        }
      }
      event {
        id
        name
        description
        rounds
        time
        startDate
        endDate
        maxEntries
        entryCount
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Games {
          items {
            id
            pgn
            memberID
            eventID
            Opponent
            Colour
            Result
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          nextToken
          startedAt
        }
        type {
          id
          name
          description
          url
          color
          time
          maxEntries
          stripePriceId
          timeControl
          eventType
          defaultPrice
          canRegister
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        entries {
          items {
            id
            eventId
            memberId
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            member {
              id
              about
              fideId
              ecfId
              username
              name
              email
              eventsByEmail
              promoByEmail
              eventsByText
              promoByText
              ecfRating
              membershipType
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
              stripeCustomerId
              stripeCurrentPeriodEnd
              stripePriceId
              stripeProductId
            }
            event {
              id
              name
              description
              rounds
              time
              startDate
              endDate
              maxEntries
              entryCount
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
          }
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const onUpdateEntry = /* GraphQL */ `
  subscription OnUpdateEntry {
    onUpdateEntry {
      id
      eventId
      memberId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      member {
        id
        about
        fideId
        ecfId
        username
        name
        email
        eventsByEmail
        promoByEmail
        eventsByText
        promoByText
        ecfRating
        membershipType
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Games {
          items {
            id
            pgn
            memberID
            eventID
            Opponent
            Colour
            Result
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          nextToken
          startedAt
        }
        stripeCustomerId
        stripeCurrentPeriodEnd
        stripePriceId
        stripeProductId
        entries {
          items {
            id
            eventId
            memberId
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            member {
              id
              about
              fideId
              ecfId
              username
              name
              email
              eventsByEmail
              promoByEmail
              eventsByText
              promoByText
              ecfRating
              membershipType
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
              stripeCustomerId
              stripeCurrentPeriodEnd
              stripePriceId
              stripeProductId
            }
            event {
              id
              name
              description
              rounds
              time
              startDate
              endDate
              maxEntries
              entryCount
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
          }
          nextToken
          startedAt
        }
      }
      event {
        id
        name
        description
        rounds
        time
        startDate
        endDate
        maxEntries
        entryCount
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Games {
          items {
            id
            pgn
            memberID
            eventID
            Opponent
            Colour
            Result
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          nextToken
          startedAt
        }
        type {
          id
          name
          description
          url
          color
          time
          maxEntries
          stripePriceId
          timeControl
          eventType
          defaultPrice
          canRegister
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        entries {
          items {
            id
            eventId
            memberId
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            member {
              id
              about
              fideId
              ecfId
              username
              name
              email
              eventsByEmail
              promoByEmail
              eventsByText
              promoByText
              ecfRating
              membershipType
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
              stripeCustomerId
              stripeCurrentPeriodEnd
              stripePriceId
              stripeProductId
            }
            event {
              id
              name
              description
              rounds
              time
              startDate
              endDate
              maxEntries
              entryCount
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
          }
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const onDeleteEntry = /* GraphQL */ `
  subscription OnDeleteEntry {
    onDeleteEntry {
      id
      eventId
      memberId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      member {
        id
        about
        fideId
        ecfId
        username
        name
        email
        eventsByEmail
        promoByEmail
        eventsByText
        promoByText
        ecfRating
        membershipType
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Games {
          items {
            id
            pgn
            memberID
            eventID
            Opponent
            Colour
            Result
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          nextToken
          startedAt
        }
        stripeCustomerId
        stripeCurrentPeriodEnd
        stripePriceId
        stripeProductId
        entries {
          items {
            id
            eventId
            memberId
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            member {
              id
              about
              fideId
              ecfId
              username
              name
              email
              eventsByEmail
              promoByEmail
              eventsByText
              promoByText
              ecfRating
              membershipType
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
              stripeCustomerId
              stripeCurrentPeriodEnd
              stripePriceId
              stripeProductId
            }
            event {
              id
              name
              description
              rounds
              time
              startDate
              endDate
              maxEntries
              entryCount
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
          }
          nextToken
          startedAt
        }
      }
      event {
        id
        name
        description
        rounds
        time
        startDate
        endDate
        maxEntries
        entryCount
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Games {
          items {
            id
            pgn
            memberID
            eventID
            Opponent
            Colour
            Result
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          nextToken
          startedAt
        }
        type {
          id
          name
          description
          url
          color
          time
          maxEntries
          stripePriceId
          timeControl
          eventType
          defaultPrice
          canRegister
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        entries {
          items {
            id
            eventId
            memberId
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            member {
              id
              about
              fideId
              ecfId
              username
              name
              email
              eventsByEmail
              promoByEmail
              eventsByText
              promoByText
              ecfRating
              membershipType
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
              stripeCustomerId
              stripeCurrentPeriodEnd
              stripePriceId
              stripeProductId
            }
            event {
              id
              name
              description
              rounds
              time
              startDate
              endDate
              maxEntries
              entryCount
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
          }
          nextToken
          startedAt
        }
      }
    }
  }
`;
