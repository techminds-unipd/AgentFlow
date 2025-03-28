import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { App } from "supertest/types";
import { AppModule } from "./../src/app.module";
import mongoose from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";
import { EdgeDTO, NodeDataDTO, NodeDTO, PositionDTO, WorkflowDTO } from "src/workflow/adapter/input/WorkflowDTO";
import ExecuteWorkflowDTO from "src/workflow/adapter/input/ExecuteWorkflowDTO";
import { HttpService } from "@nestjs/axios";
import { of } from "rxjs";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

jest.mock('googleapis', () => {
    return {
        google: {
            oauth2: () => jest.fn().mockReturnValue(""),
        },
    };
});

describe("Backend Controller (e2e)", () => {
    let app: INestApplication<App>;
    let jwt = "";
    let httpServiceMock = { get: jest.fn(), post: jest.fn() };
    const response: AxiosResponse<string> = {
            data: "result",
            status: 200,
            statusText: "OK",
            headers: {},
            config: {} as InternalAxiosRequestConfig<any>
    };
    const user = { username: "gianni", password: "Test1234!" };
    let workflowDTOMock = new WorkflowDTO("prova", [
            new NodeDTO(9, new PositionDTO(3, 3), new NodeDataDTO("PASTEBIN")),
            new NodeDTO(4, new PositionDTO(1, 1), new NodeDataDTO("GCALENDAR")),
            new NodeDTO(7, new PositionDTO(2, 2), new NodeDataDTO("GMAIL"))
        ], [
            new EdgeDTO("action2", 7, 9),
            new EdgeDTO("action1", 4, 7)
    ]);
    const workflowDTOOrderedMock = new WorkflowDTO("prova", [
        new NodeDTO(0, new PositionDTO(1, 1), new NodeDataDTO("GCALENDAR")),
        new NodeDTO(1, new PositionDTO(2, 2), new NodeDataDTO("GMAIL")),
        new NodeDTO(2, new PositionDTO(3, 3), new NodeDataDTO("PASTEBIN"))
    ], [
        new EdgeDTO("action1", 0, 1),
        new EdgeDTO("action2", 1, 2)
    ]);
    let executeWorkflowDTOMock = new ExecuteWorkflowDTO(workflowDTOOrderedMock, { token: "", refreshToken: "", expireDate: new Date() });
    let wrongExecuteWorkflowDTOMock = new ExecuteWorkflowDTO(new WorkflowDTO("newWorkflow", [], []), { token: "", refreshToken: "", expireDate: new Date() });

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({ 
            imports: [
                MongooseModule.forRoot("mongodb://root:password@localhost:27017", { dbName: "e2e-test" }),
                AppModule 
            ]
        })
        .overrideProvider(HttpService)
        .useValue(httpServiceMock)
        .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await mongoose.connect("mongodb://root:password@localhost:27017", { dbName: "e2e-test" });
        await mongoose.connection.db!.dropDatabase();
        await mongoose.connection.close();
        await app.close();
    });

    describe("/user/register", () => {
        it("TIB1 - (POST) - should register a new user", async () => {
            return await request(app.getHttpServer())
            .post("/user/register")
            .send(user)
            .expect(201)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.username).toEqual(user.username);
            });
        });

        it("TIB2 -(POST) - shouldn't register a new user because it already exist", async () => {
            return await request(app.getHttpServer())
            .post("/user/register")
            .send(user)
            .expect(400);
        });
    });

    describe("/user/login", () => {
        it("TIB3 -(POST) - should login with a registered user", async () => {
            return await request(app.getHttpServer())
            .post("/user/login")
            .send(user)
            .expect(201)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.accessToken).toBeDefined();
                jwt = response.body.accessToken;
            });
        });

        it("TIB4 -(POST) - shouldn't login the user with wrong credentials", async () => {
            return await request(app.getHttpServer())
            .post("/user/login")
            .send({ username: "wrongUsername", password: "wrongPassword" })
            .expect(401);
        });
    });

    describe("/workflow/create", () => {
        it("TIB5 -(POST) - should create a new empty workflow", async () => {
            return await request(app.getHttpServer())
            .post(`/workflow/create/${workflowDTOMock.name}`)
            .set("Authorization", `Bearer ${jwt}`)
            .expect(201)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.name).toEqual(workflowDTOMock.name);
            });
        });

        it("TIB6 -(POST) - shouldn't create a new workflow because it already exist", async () => {
            return await request(app.getHttpServer())
            .post(`/workflow/create/${workflowDTOMock.name}`)
            .set("Authorization", `Bearer ${jwt}`)
            .expect(400);
        });
    });

    describe("/workflow/save", () => {
        it("TIB7 -(PUT) - should save the workflow", async () => {
            return await request(app.getHttpServer())
            .put("/workflow/save")
            .send(workflowDTOMock)
            .set("Authorization", `Bearer ${jwt}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.name).toEqual(workflowDTOOrderedMock.name);
                expect(response.body.nodes).toEqual(workflowDTOOrderedMock.nodes);
                expect(response.body.edges).toEqual(workflowDTOOrderedMock.edges);
            });
        });

        it("TIB8 -(PUT) - shouldn't save the workflow because is not valid", async () => {
            return await request(app.getHttpServer())
            .put("/workflow/save")
            .send(new WorkflowDTO("newWorkflow", [], []))
            .set("Authorization", `Bearer ${jwt}`)
            .expect(412);
        });
    });

    describe("/workflow/get", () => {
        it("TIB9 -(GET) - should get the workflow", async () => {
            return await request(app.getHttpServer())
            .get(`/workflow/get/${workflowDTOMock.name}`)
            .set("Authorization", `Bearer ${jwt}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.name).toEqual(workflowDTOOrderedMock.name);
                expect(response.body.nodes).toEqual(workflowDTOOrderedMock.nodes);
                expect(response.body.edges).toEqual(workflowDTOOrderedMock.edges);
            });
        });

        it("TIB10 -(GET) - shouldn't get the workflow because it doesn't exist", async () => {
            return await request(app.getHttpServer())
            .get("/workflow/get/newWorkflow")
            .set("Authorization", `Bearer ${jwt}`)
            .expect(404);
        });
    });

    describe("/workflow/all", () => {
        it("TIB11 -(GET) - should get all the workflows", async () => {
            await request(app.getHttpServer()).post("/workflow/create/workflow2").set("Authorization", `Bearer ${jwt}`);
            await request(app.getHttpServer()).post("/workflow/create/workflow3").set("Authorization", `Bearer ${jwt}`);
            return await request(app.getHttpServer())
            .get("/workflow/all")
            .set("Authorization", `Bearer ${jwt}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body).toHaveLength(3);
                expect(response.body[0]).toEqual(workflowDTOOrderedMock.name);
                expect(response.body[1]).toEqual("workflow2");
                expect(response.body[2]).toEqual("workflow3");
            });
        });
    });

    describe("/workflow/execute", () => {
        it("TIB12 -(POST) - should execute the workflow", async () => {
            httpServiceMock.get.mockReturnValue(of(response));
            httpServiceMock.post.mockReturnValue(of(response));
            return await request(app.getHttpServer())
            .post("/workflow/execute")
            .send(executeWorkflowDTOMock)
            .set("Authorization", `Bearer ${jwt}`)
            .expect(201)
        });

        it("TIB13 -(POST) - shouldn't execute the workflow because is not valid", async () => {
            return await request(app.getHttpServer())
            .post("/workflow/execute")
            .send(wrongExecuteWorkflowDTOMock)
            .set("Authorization", `Bearer ${jwt}`)
            .expect(412);
        });
    });

    describe("/workflow/delete", () => {
        it("TIB14 -(DELETE) - should delete the workflow", async () => {
            return await request(app.getHttpServer())
            .delete(`/workflow/delete/${workflowDTOMock.name}`)
            .set("Authorization", `Bearer ${jwt}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeDefined();
                expect(response.body.name).toEqual(workflowDTOMock.name);
            });
        });

        it("TIB15 -(DELETE) - shouldn't delete the workflow because it doesn't exist", async () => {
            return await request(app.getHttpServer())
            .delete("/workflow/delete/newWorkflow")
            .set("Authorization", `Bearer ${jwt}`)
            .expect(404);
        });
    });

    // describe("google/auth", () => {
    //     it("(GET) - should return http 302 for redirection", async () => {
    //         return await request(app.getHttpServer())
    //         .get("/google/auth")
    //         .set("Authorization", `Bearer ${jwt}`)
    //         .expect(302);
    //     });
    // });

});