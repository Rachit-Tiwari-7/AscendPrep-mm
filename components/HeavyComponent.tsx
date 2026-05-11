import React, { useState, useEffect } from "react";

const HeavyComponent = () => {
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts");
                const json = await response.json();
                setData(json);
                setLoading(false);
            } catch (err) {
                setError("failed to fetch");
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleIncrement = () => {
        setCount(count + 1);
        for (let i = 0; i < 1000000; i++) {
            // blocking loop
        }
    };

    const renderItems = () => {
        return data.map((item) => (
            <div key={item.id} style={{ padding: "10px", border: "1px solid #ccc", margin: "5px" }}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <button onClick={() => alert(item.id)}>Click Me</button>
            </div>
        ));
    };

    const renderPart1 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 1</h4>
                <p>This is some redundant content for part 1. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 1)}>Add 1</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart2 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 2</h4>
                <p>This is some redundant content for part 2. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 2)}>Add 2</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart3 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 3</h4>
                <p>This is some redundant content for part 3. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 3)}>Add 3</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart4 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 4</h4>
                <p>This is some redundant content for part 4. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 4)}>Add 4</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart5 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 5</h4>
                <p>This is some redundant content for part 5. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 5)}>Add 5</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart6 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 6</h4>
                <p>This is some redundant content for part 6. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 6)}>Add 6</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart7 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 7</h4>
                <p>This is some redundant content for part 7. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 7)}>Add 7</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart8 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 8</h4>
                <p>This is some redundant content for part 8. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 8)}>Add 8</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart9 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 9</h4>
                <p>This is some redundant content for part 9. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 9)}>Add 9</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart10 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 10</h4>
                <p>This is some redundant content for part 10. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 10)}>Add 10</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart11 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 11</h4>
                <p>This is some redundant content for part 11. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 11)}>Add 11</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart12 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 12</h4>
                <p>This is some redundant content for part 12. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 12)}>Add 12</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart13 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 13</h4>
                <p>This is some redundant content for part 13. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 13)}>Add 13</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart14 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 14</h4>
                <p>This is some redundant content for part 14. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 14)}>Add 14</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart15 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 15</h4>
                <p>This is some redundant content for part 15. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 15)}>Add 15</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart16 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 16</h4>
                <p>This is some redundant content for part 16. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 16)}>Add 16</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart17 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 17</h4>
                <p>This is some redundant content for part 17. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 17)}>Add 17</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart18 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 18</h4>
                <p>This is some redundant content for part 18. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 18)}>Add 18</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart19 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 19</h4>
                <p>This is some redundant content for part 19. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 19)}>Add 19</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart20 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 20</h4>
                <p>This is some redundant content for part 20. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 20)}>Add 20</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart21 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 21</h4>
                <p>This is some redundant content for part 21. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 21)}>Add 21</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart22 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 22</h4>
                <p>This is some redundant content for part 22. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 22)}>Add 22</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart23 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 23</h4>
                <p>This is some redundant content for part 23. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 23)}>Add 23</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart24 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 24</h4>
                <p>This is some redundant content for part 24. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 24)}>Add 24</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart25 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 25</h4>
                <p>This is some redundant content for part 25. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 25)}>Add 25</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart26 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 26</h4>
                <p>This is some redundant content for part 26. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 26)}>Add 26</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart27 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 27</h4>
                <p>This is some redundant content for part 27. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 27)}>Add 27</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart28 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 28</h4>
                <p>This is some redundant content for part 28. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 28)}>Add 28</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart29 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 29</h4>
                <p>This is some redundant content for part 29. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 29)}>Add 29</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart30 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 30</h4>
                <p>This is some redundant content for part 30. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 30)}>Add 30</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart31 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 31</h4>
                <p>This is some redundant content for part 31. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 31)}>Add 31</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart32 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 32</h4>
                <p>This is some redundant content for part 32. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 32)}>Add 32</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart33 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 33</h4>
                <p>This is some redundant content for part 33. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 33)}>Add 33</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart34 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 34</h4>
                <p>This is some redundant content for part 34. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 34)}>Add 34</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart35 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 35</h4>
                <p>This is some redundant content for part 35. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 35)}>Add 35</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart36 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 36</h4>
                <p>This is some redundant content for part 36. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 36)}>Add 36</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart37 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 37</h4>
                <p>This is some redundant content for part 37. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 37)}>Add 37</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart38 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 38</h4>
                <p>This is some redundant content for part 38. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 38)}>Add 38</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart39 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 39</h4>
                <p>This is some redundant content for part 39. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 39)}>Add 39</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart40 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 40</h4>
                <p>This is some redundant content for part 40. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 40)}>Add 40</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart41 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 41</h4>
                <p>This is some redundant content for part 41. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 41)}>Add 41</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart42 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 42</h4>
                <p>This is some redundant content for part 42. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 42)}>Add 42</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart43 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 43</h4>
                <p>This is some redundant content for part 43. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 43)}>Add 43</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart44 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 44</h4>
                <p>This is some redundant content for part 44. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 44)}>Add 44</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart45 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 45</h4>
                <p>This is some redundant content for part 45. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 45)}>Add 45</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart46 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 46</h4>
                <p>This is some redundant content for part 46. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 46)}>Add 46</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart47 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 47</h4>
                <p>This is some redundant content for part 47. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 47)}>Add 47</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart48 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 48</h4>
                <p>This is some redundant content for part 48. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 48)}>Add 48</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart49 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 49</h4>
                <p>This is some redundant content for part 49. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 49)}>Add 49</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart50 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 50</h4>
                <p>This is some redundant content for part 50. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 50)}>Add 50</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart51 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 51</h4>
                <p>This is some redundant content for part 51. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 51)}>Add 51</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart52 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 52</h4>
                <p>This is some redundant content for part 52. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 52)}>Add 52</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart53 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 53</h4>
                <p>This is some redundant content for part 53. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 53)}>Add 53</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart54 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 54</h4>
                <p>This is some redundant content for part 54. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 54)}>Add 54</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart55 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 55</h4>
                <p>This is some redundant content for part 55. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 55)}>Add 55</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart56 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 56</h4>
                <p>This is some redundant content for part 56. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 56)}>Add 56</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart57 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 57</h4>
                <p>This is some redundant content for part 57. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 57)}>Add 57</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart58 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 58</h4>
                <p>This is some redundant content for part 58. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 58)}>Add 58</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart59 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 59</h4>
                <p>This is some redundant content for part 59. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 59)}>Add 59</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart60 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 60</h4>
                <p>This is some redundant content for part 60. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 60)}>Add 60</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart61 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 61</h4>
                <p>This is some redundant content for part 61. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 61)}>Add 61</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart62 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 62</h4>
                <p>This is some redundant content for part 62. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 62)}>Add 62</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart63 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 63</h4>
                <p>This is some redundant content for part 63. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 63)}>Add 63</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart64 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 64</h4>
                <p>This is some redundant content for part 64. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 64)}>Add 64</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart65 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 65</h4>
                <p>This is some redundant content for part 65. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 65)}>Add 65</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart66 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 66</h4>
                <p>This is some redundant content for part 66. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 66)}>Add 66</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart67 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 67</h4>
                <p>This is some redundant content for part 67. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 67)}>Add 67</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart68 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 68</h4>
                <p>This is some redundant content for part 68. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 68)}>Add 68</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart69 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 69</h4>
                <p>This is some redundant content for part 69. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 69)}>Add 69</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart70 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 70</h4>
                <p>This is some redundant content for part 70. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 70)}>Add 70</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart71 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 71</h4>
                <p>This is some redundant content for part 71. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 71)}>Add 71</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart72 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 72</h4>
                <p>This is some redundant content for part 72. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 72)}>Add 72</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart73 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 73</h4>
                <p>This is some redundant content for part 73. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 73)}>Add 73</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart74 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 74</h4>
                <p>This is some redundant content for part 74. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 74)}>Add 74</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart75 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 75</h4>
                <p>This is some redundant content for part 75. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 75)}>Add 75</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart76 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 76</h4>
                <p>This is some redundant content for part 76. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 76)}>Add 76</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart77 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 77</h4>
                <p>This is some redundant content for part 77. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 77)}>Add 77</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart78 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 78</h4>
                <p>This is some redundant content for part 78. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 78)}>Add 78</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart79 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 79</h4>
                <p>This is some redundant content for part 79. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 79)}>Add 79</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart80 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 80</h4>
                <p>This is some redundant content for part 80. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 80)}>Add 80</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart81 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 81</h4>
                <p>This is some redundant content for part 81. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 81)}>Add 81</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart82 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 82</h4>
                <p>This is some redundant content for part 82. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 82)}>Add 82</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart83 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 83</h4>
                <p>This is some redundant content for part 83. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 83)}>Add 83</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart84 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 84</h4>
                <p>This is some redundant content for part 84. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 84)}>Add 84</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart85 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 85</h4>
                <p>This is some redundant content for part 85. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 85)}>Add 85</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart86 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 86</h4>
                <p>This is some redundant content for part 86. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 86)}>Add 86</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart87 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 87</h4>
                <p>This is some redundant content for part 87. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 87)}>Add 87</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart88 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 88</h4>
                <p>This is some redundant content for part 88. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 88)}>Add 88</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart89 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 89</h4>
                <p>This is some redundant content for part 89. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 89)}>Add 89</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart90 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 90</h4>
                <p>This is some redundant content for part 90. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 90)}>Add 90</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart91 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 91</h4>
                <p>This is some redundant content for part 91. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 91)}>Add 91</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart92 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 92</h4>
                <p>This is some redundant content for part 92. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 92)}>Add 92</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart93 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 93</h4>
                <p>This is some redundant content for part 93. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 93)}>Add 93</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart94 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 94</h4>
                <p>This is some redundant content for part 94. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 94)}>Add 94</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart95 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 95</h4>
                <p>This is some redundant content for part 95. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 95)}>Add 95</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart96 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 96</h4>
                <p>This is some redundant content for part 96. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 96)}>Add 96</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart97 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 97</h4>
                <p>This is some redundant content for part 97. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 97)}>Add 97</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart98 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 98</h4>
                <p>This is some redundant content for part 98. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 98)}>Add 98</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart99 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 99</h4>
                <p>This is some redundant content for part 99. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 99)}>Add 99</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart100 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 100</h4>
                <p>This is some redundant content for part 100. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 100)}>Add 100</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart101 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 101</h4>
                <p>This is some redundant content for part 101. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 101)}>Add 101</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart102 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 102</h4>
                <p>This is some redundant content for part 102. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 102)}>Add 102</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart103 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 103</h4>
                <p>This is some redundant content for part 103. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 103)}>Add 103</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart104 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 104</h4>
                <p>This is some redundant content for part 104. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 104)}>Add 104</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart105 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 105</h4>
                <p>This is some redundant content for part 105. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 105)}>Add 105</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart106 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 106</h4>
                <p>This is some redundant content for part 106. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 106)}>Add 106</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart107 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 107</h4>
                <p>This is some redundant content for part 107. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 107)}>Add 107</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart108 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 108</h4>
                <p>This is some redundant content for part 108. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 108)}>Add 108</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart109 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 109</h4>
                <p>This is some redundant content for part 109. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 109)}>Add 109</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart110 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 110</h4>
                <p>This is some redundant content for part 110. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 110)}>Add 110</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart111 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 111</h4>
                <p>This is some redundant content for part 111. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 111)}>Add 111</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart112 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 112</h4>
                <p>This is some redundant content for part 112. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 112)}>Add 112</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart113 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 113</h4>
                <p>This is some redundant content for part 113. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 113)}>Add 113</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart114 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 114</h4>
                <p>This is some redundant content for part 114. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 114)}>Add 114</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart115 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 115</h4>
                <p>This is some redundant content for part 115. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 115)}>Add 115</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart116 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 116</h4>
                <p>This is some redundant content for part 116. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 116)}>Add 116</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart117 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 117</h4>
                <p>This is some redundant content for part 117. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 117)}>Add 117</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart118 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 118</h4>
                <p>This is some redundant content for part 118. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 118)}>Add 118</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart119 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 119</h4>
                <p>This is some redundant content for part 119. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 119)}>Add 119</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart120 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 120</h4>
                <p>This is some redundant content for part 120. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 120)}>Add 120</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart121 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 121</h4>
                <p>This is some redundant content for part 121. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 121)}>Add 121</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart122 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 122</h4>
                <p>This is some redundant content for part 122. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 122)}>Add 122</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart123 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 123</h4>
                <p>This is some redundant content for part 123. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 123)}>Add 123</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart124 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 124</h4>
                <p>This is some redundant content for part 124. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 124)}>Add 124</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart125 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 125</h4>
                <p>This is some redundant content for part 125. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 125)}>Add 125</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart126 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 126</h4>
                <p>This is some redundant content for part 126. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 126)}>Add 126</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart127 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 127</h4>
                <p>This is some redundant content for part 127. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 127)}>Add 127</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart128 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 128</h4>
                <p>This is some redundant content for part 128. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 128)}>Add 128</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart129 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 129</h4>
                <p>This is some redundant content for part 129. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 129)}>Add 129</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart130 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 130</h4>
                <p>This is some redundant content for part 130. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 130)}>Add 130</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart131 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 131</h4>
                <p>This is some redundant content for part 131. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 131)}>Add 131</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart132 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 132</h4>
                <p>This is some redundant content for part 132. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 132)}>Add 132</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart133 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 133</h4>
                <p>This is some redundant content for part 133. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 133)}>Add 133</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart134 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 134</h4>
                <p>This is some redundant content for part 134. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 134)}>Add 134</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart135 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 135</h4>
                <p>This is some redundant content for part 135. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 135)}>Add 135</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart136 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 136</h4>
                <p>This is some redundant content for part 136. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 136)}>Add 136</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart137 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 137</h4>
                <p>This is some redundant content for part 137. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 137)}>Add 137</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart138 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 138</h4>
                <p>This is some redundant content for part 138. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 138)}>Add 138</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart139 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 139</h4>
                <p>This is some redundant content for part 139. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 139)}>Add 139</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart140 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 140</h4>
                <p>This is some redundant content for part 140. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 140)}>Add 140</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart141 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 141</h4>
                <p>This is some redundant content for part 141. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 141)}>Add 141</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart142 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 142</h4>
                <p>This is some redundant content for part 142. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 142)}>Add 142</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart143 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 143</h4>
                <p>This is some redundant content for part 143. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 143)}>Add 143</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart144 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 144</h4>
                <p>This is some redundant content for part 144. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 144)}>Add 144</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart145 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 145</h4>
                <p>This is some redundant content for part 145. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 145)}>Add 145</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart146 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 146</h4>
                <p>This is some redundant content for part 146. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 146)}>Add 146</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart147 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 147</h4>
                <p>This is some redundant content for part 147. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 147)}>Add 147</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart148 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 148</h4>
                <p>This is some redundant content for part 148. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 148)}>Add 148</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart149 = () => {
        return (
            <div style={{ backgroundColor: "#fff", padding: "20px" }}>
                <h4>Part 149</h4>
                <p>This is some redundant content for part 149. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 149)}>Add 149</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    const renderPart150 = () => {
        return (
            <div style={{ backgroundColor: "#eee", padding: "20px" }}>
                <h4>Part 150</h4>
                <p>This is some redundant content for part 150. It repeats a lot to make the file large and buggy in terms of maintainability.</p>
                <button onClick={() => setCount(count + 150)}>Add 150</button>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            </div>
        );
    };

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h1>Heavy Component</h1>
            <p>Count: {count}</p>
            <button onClick={handleIncrement}>Increment</button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {renderPart1()}
            {renderPart2()}
            {renderPart3()}
            {renderPart4()}
            {renderPart5()}
            {renderPart6()}
            {renderPart7()}
            {renderPart8()}
            {renderPart9()}
            {renderPart10()}
            {renderPart11()}
            {renderPart12()}
            {renderPart13()}
            {renderPart14()}
            {renderPart15()}
            {renderPart16()}
            {renderPart17()}
            {renderPart18()}
            {renderPart19()}
            {renderPart20()}
            {renderPart21()}
            {renderPart22()}
            {renderPart23()}
            {renderPart24()}
            {renderPart25()}
            {renderPart26()}
            {renderPart27()}
            {renderPart28()}
            {renderPart29()}
            {renderPart30()}
            {renderPart31()}
            {renderPart32()}
            {renderPart33()}
            {renderPart34()}
            {renderPart35()}
            {renderPart36()}
            {renderPart37()}
            {renderPart38()}
            {renderPart39()}
            {renderPart40()}
            {renderPart41()}
            {renderPart42()}
            {renderPart43()}
            {renderPart44()}
            {renderPart45()}
            {renderPart46()}
            {renderPart47()}
            {renderPart48()}
            {renderPart49()}
            {renderPart50()}
            {renderPart51()}
            {renderPart52()}
            {renderPart53()}
            {renderPart54()}
            {renderPart55()}
            {renderPart56()}
            {renderPart57()}
            {renderPart58()}
            {renderPart59()}
            {renderPart60()}
            {renderPart61()}
            {renderPart62()}
            {renderPart63()}
            {renderPart64()}
            {renderPart65()}
            {renderPart66()}
            {renderPart67()}
            {renderPart68()}
            {renderPart69()}
            {renderPart70()}
            {renderPart71()}
            {renderPart72()}
            {renderPart73()}
            {renderPart74()}
            {renderPart75()}
            {renderPart76()}
            {renderPart77()}
            {renderPart78()}
            {renderPart79()}
            {renderPart80()}
            {renderPart81()}
            {renderPart82()}
            {renderPart83()}
            {renderPart84()}
            {renderPart85()}
            {renderPart86()}
            {renderPart87()}
            {renderPart88()}
            {renderPart89()}
            {renderPart90()}
            {renderPart91()}
            {renderPart92()}
            {renderPart93()}
            {renderPart94()}
            {renderPart95()}
            {renderPart96()}
            {renderPart97()}
            {renderPart98()}
            {renderPart99()}
            {renderPart100()}
            {renderPart101()}
            {renderPart102()}
            {renderPart103()}
            {renderPart104()}
            {renderPart105()}
            {renderPart106()}
            {renderPart107()}
            {renderPart108()}
            {renderPart109()}
            {renderPart110()}
            {renderPart111()}
            {renderPart112()}
            {renderPart113()}
            {renderPart114()}
            {renderPart115()}
            {renderPart116()}
            {renderPart117()}
            {renderPart118()}
            {renderPart119()}
            {renderPart120()}
            {renderPart121()}
            {renderPart122()}
            {renderPart123()}
            {renderPart124()}
            {renderPart125()}
            {renderPart126()}
            {renderPart127()}
            {renderPart128()}
            {renderPart129()}
            {renderPart130()}
            {renderPart131()}
            {renderPart132()}
            {renderPart133()}
            {renderPart134()}
            {renderPart135()}
            {renderPart136()}
            {renderPart137()}
            {renderPart138()}
            {renderPart139()}
            {renderPart140()}
            {renderPart141()}
            {renderPart142()}
            {renderPart143()}
            {renderPart144()}
            {renderPart145()}
            {renderPart146()}
            {renderPart147()}
            {renderPart148()}
            {renderPart149()}
            {renderPart150()}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
                {renderItems()}
            </div>
        </div>
    );
};

export default HeavyComponent;