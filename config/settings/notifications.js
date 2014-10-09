 // NOTIFICATION SETTINGS
 module.exports = {
  // service functions called to produce the given audience
  audiences : {
    'everyone' : {
      method: 'findAllUsers'
    },
    'user' : {
      method: 'findUser'
    },
    // project audiences
    'projectOwners' : {
      method: 'findProjectOwners'
    },
    'projectParticipants' : {
      method: 'findProjectParticipants'
    },
    'projectLikers' : {
      method: 'findProjectLikers'
    },
    'projectThreadCommenters' : {
      method: 'findProjectThreadParentCommenters'
    },
    // task audiences
    'taskOwners' : {
      method: 'findTaskOwners'
    },
    'taskParticipants' : {
      method: 'findTaskParticipants'
    },
    'taskLikers' : {
      method: 'findTaskLikers'
    },
    'taskThreadCommenters' : {
      method: 'findTaskThreadParentCommenters'
    }
  },
  // Defines preflight delivery-building functions
  preflights: {
    'preflightProjectCommentReplyParent': {
      method: 'prepareCommentReplyEmail',
      settings: {
        emailName: 'projectCommentParentReply'
      }
    },
    'preflightProjectCommentReplyOwner': {
      method: 'prepareCommentReplyEmail',
      settings: {
        emailName: 'projectCommentOwnerReply'
      }
    },
    'preflightTaskCommentReplyParent': {
      method: 'prepareCommentReplyEmail',
      settings: {
        emailName: 'taskCommentParentReply'
      }
    },
    'preflightTaskCommentReplyOwner': {
      name: 'taskCommentReplyOwnerPrepare',
      method: 'prepareCommentReplyEmail',
      settings: {
        emailName: 'taskCommentOwnerReply'
      }
    },
    'preflightTaskVolunteerOwner': {
      method: 'prepareTaskVolunteerOwnerEmail',
      settings: {
        emailName: 'taskVolunteerAddedOwnerReply'
      }
    },
    'preflightUserPasswordReset': {
      method: 'prepareUserPasswordResetEmail',
      settings: {
        emailName: 'userPasswordResetEmail'
      }
    },
    'bypass': {
      name: 'bypass',
      method: 'passThrough',
      settings: {}
    }
  },
  // defines delivery functions
  deliveries: {
    'sendSimpleEmail': {
      name: 'sendSimpleEmail',
      method: 'sendSimpleEmail'
    },
    'bypass': {
      name: 'bypass',
      method: 'bypass'
    }
  },
  // defines trigger route configuration to respond correctly to action triggers
  triggerRoutes : {
    'globalBlast': {
      audience:{
        'everyone': {
          strategy: {
            'contactEmail': {
              preflight: ['bypass'],
              delivery: 'sendSimpleEmail'
            }
          }
        }
      }
    },
    'directUserEmailRequestFromCard': {
      audience:{
        'user': {
          strategy: {
            'contactEmail': {
              preflight: ['bypass'],
              delivery: 'sendSimpleEmail'
            }
          }
        }
      }
    },
    'userPasswordReset': {
      audience:{
        'user': {
          strategy: {
            'userPasswordReset': {
              preflight: ['preflightUserPasswordReset'],
              delivery: 'sendSimpleEmail'
            }
          }
        }
      }
    },
    'projectCommentAdded': {
      audience:{
        'projectOwners': {
          strategy: {
            'contactProjectOwnersOnCommentEmail': {
              preflight: ['preflightProjectCommentReplyOwner'],
              delivery: 'sendSimpleEmail'
            }
          }
        },
        'projectThreadCommenters': {
          strategy: {
            'contactProjectCommentParentOnCommentEmail': {
              preflight: ['preflightProjectCommentReplyParent'],
              delivery: 'sendSimpleEmail'
            }
          }
        }
      }
    },
    'taskCommentAdded': {
      audience:{
        'taskOwners': {
          strategy: {
            'contactTaskOwnersOnCommentEmail': {
              preflight: ['preflightTaskCommentReplyOwner'],
              delivery: 'sendSimpleEmail'
            }
          }
        },
        'taskThreadCommenters': {
          strategy: {
            'contactTaskCommentParentOnCommentEmail': {
              preflight: ['preflightTaskCommentReplyParent'],
              delivery: 'sendSimpleEmail'
            }
          }
        }
      }
    },
    'taskVolunteerAdded': {
      audience:{
        'taskOwners': {
          strategy: {
            'contactTaskOwnersOnVolunteerEmail': {
              preflight: ['preflightTaskVolunteerOwnerEmail'],
              delivery: 'sendSimpleEmail'
            }
          }
        }
      }
    }
  }
};
