/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateResult = /* GraphQL */ `
  subscription OnCreateResult {
    onCreateResult {
      id
      pairings
      results
      players
      eventID
      name
      complete
      live
      winner
      dgtCloudUrl
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateResult = /* GraphQL */ `
  subscription OnUpdateResult {
    onUpdateResult {
      id
      pairings
      results
      players
      eventID
      name
      complete
      live
      winner
      dgtCloudUrl
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteResult = /* GraphQL */ `
  subscription OnDeleteResult {
    onDeleteResult {
      id
      pairings
      results
      players
      eventID
      name
      complete
      live
      winner
      dgtCloudUrl
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
      id
      pgn
      opponent
      colour
      result
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
      opponent
      colour
      result
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
      opponent
      colour
      result
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
      ecfRating
      membershipType
      gameInfo
      ratingInfo
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
            ecfRating
            membershipType
            gameInfo
            ratingInfo
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
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
            complete
            cancelled
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            results {
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
      ecfRating
      membershipType
      gameInfo
      ratingInfo
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
            ecfRating
            membershipType
            gameInfo
            ratingInfo
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
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
            complete
            cancelled
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            results {
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
      ecfRating
      membershipType
      gameInfo
      ratingInfo
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
            ecfRating
            membershipType
            gameInfo
            ratingInfo
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
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
            complete
            cancelled
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            results {
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
      complete
      cancelled
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      results {
        items {
          id
          pairings
          results
          players
          eventID
          name
          complete
          live
          winner
          dgtCloudUrl
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
            ecfRating
            membershipType
            gameInfo
            ratingInfo
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
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
            complete
            cancelled
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            results {
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
      complete
      cancelled
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      results {
        items {
          id
          pairings
          results
          players
          eventID
          name
          complete
          live
          winner
          dgtCloudUrl
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
            ecfRating
            membershipType
            gameInfo
            ratingInfo
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
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
            complete
            cancelled
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            results {
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
      complete
      cancelled
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      results {
        items {
          id
          pairings
          results
          players
          eventID
          name
          complete
          live
          winner
          dgtCloudUrl
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
            ecfRating
            membershipType
            gameInfo
            ratingInfo
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
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
            complete
            cancelled
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            results {
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
        ecfRating
        membershipType
        gameInfo
        ratingInfo
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
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
              ecfRating
              membershipType
              gameInfo
              ratingInfo
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
              complete
              cancelled
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
        complete
        cancelled
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        results {
          items {
            id
            pairings
            results
            players
            eventID
            name
            complete
            live
            winner
            dgtCloudUrl
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
              ecfRating
              membershipType
              gameInfo
              ratingInfo
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
              complete
              cancelled
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
        ecfRating
        membershipType
        gameInfo
        ratingInfo
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
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
              ecfRating
              membershipType
              gameInfo
              ratingInfo
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
              complete
              cancelled
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
        complete
        cancelled
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        results {
          items {
            id
            pairings
            results
            players
            eventID
            name
            complete
            live
            winner
            dgtCloudUrl
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
              ecfRating
              membershipType
              gameInfo
              ratingInfo
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
              complete
              cancelled
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
        ecfRating
        membershipType
        gameInfo
        ratingInfo
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
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
              ecfRating
              membershipType
              gameInfo
              ratingInfo
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
              complete
              cancelled
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
        complete
        cancelled
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        results {
          items {
            id
            pairings
            results
            players
            eventID
            name
            complete
            live
            winner
            dgtCloudUrl
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
              ecfRating
              membershipType
              gameInfo
              ratingInfo
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
              complete
              cancelled
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
