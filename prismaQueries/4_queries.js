const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const util = require('util');

// to run specific function : write this in terminal node 4_queries.js (function name) 
function getAllStaff() {
	return prisma.staff.findMany({		
	})
}

/** Section A: Basic Queries */


function getHodInfo() {
  return prisma.department.findMany({
    select: {
      deptName: true,
      hodApptDate: true
    }
  })
}



function getDeptStaffingInfo() {
	return prisma.department.findMany({
		select: {
			deptCode: true,
			noOfStaff: true
		}
	});
}


/** Section B: Filtering Queries */


function getStaffofSpecificCitizenships() {
  return prisma.staff.findMany({
    where: {
      citizenship: {
        in: ['Hong Kong', 'Korea', 'Malaysia', 'Thailand']
      }
    },
	orderBy: [
		{
			citizenship:'asc'
		}
	],
    select: {
		citizenship: true,
    	staffName: true
    }
  });
}


function getStaffByCriteria1() {
	return prisma.staff.findMany({
		where: {
			gender: {
				equals: 'M'
			},
			maritalStatus: {
				equals: 'M'
			},
			pay: {
				gt: 4000,
				lt: 7000
			},
			pay: {
				gt: 2000,
				lt: 6000
			}
		},
		orderBy: [
			{
			gender:'asc'
			},
			{
			pay:'asc'
			}
		],
		select: {
			gender: true,
			pay: true,
			maritalStatus: true,
			staffName: true
		}
	});
}


/** Section C: Relation Queries */

async function getDepartmentCourses() {
  return prisma.department.findMany({
    orderBy: {
      deptName: 'asc', 
    },
    select: {
      deptName: true,  
      course: {  
        select: {
          crseName: true,  
          crseFee: true,   
          labFee: true,    
        },
      },
    },
  });
}



const getStaffAndDependents = () => {
  return prisma.staff.findMany({
    where: {
      staffDependent: {
		some: {}
      },
    },
    orderBy: {
      staffName: 'asc',  
    },
    select: {
      staffName: true,  
      staffDependent: {  
        select: {
          dependentName: true,  
          relationship: true,   
        },
      },
    },
  });
};


const getDepartmentCourseStudentDob = () => {
  return prisma.department.findMany({
    where: {
      course: {
        some: {
          student: {
            some: {}
          }
        }
      }
    },
    select: {
      deptName: true,
      course: {
        select: {
          crseName: true,
          student: {
            select: {
              studName: true,
              dob: true
            },
            orderBy: {
              dob: 'asc' 
            }
          }
        },
        orderBy: {
          crseName: 'asc'
        }
      }
    },
    orderBy: {
      deptName: 'asc'
    }
  });
};

async function main(argument) {
	let results;
	switch (argument) {
		case 'getAllStaff':
			results = await getAllStaff();
			break;
		case 'getHodInfo':
			results = await getHodInfo();
			break;
		case 'getDeptStaffingInfo':
			results = await getDeptStaffingInfo();
			break;
		case 'getStaffofSpecificCitizenships':
			results = await getStaffofSpecificCitizenships();
			break;
		case 'getStaffByCriteria1':
			results = await getStaffByCriteria1();
			break;
		case 'getDepartmentCourses':
			results = await getDepartmentCourses();
			break;
		case 'getStaffAndDependents':
			results = await getStaffAndDependents();
			break;
		case 'getDepartmentCourseStudentDob':
			results = await getDepartmentCourseStudentDob();
			break;
		default:
			console.log('Invalid argument');
			break;
	}
	results && console.log(util.inspect(results, { showHidden: false, depth: null, colors: true }));
}

main(process.argv[2]);
